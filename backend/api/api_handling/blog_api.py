from uuid import uuid4
from django.conf import settings
import boto3
from rest_framework import viewsets,status
from ..serializers import BlogSerializer
from ..models import Blog,Image
from rest_framework.response import Response
from django.db.models import F
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from rest_framework.permissions import IsAuthenticated,AllowAny
from ..authenticate import JWTCookieAuthentication




PAGE_SIZE = 10

class BlogViewSet(viewsets.ModelViewSet):

    serializer_class = BlogSerializer
    queryset = Blog.objects.all()
    http_method_names = ['get','post','delete','put']

    def get_permissions(self):
        if self.action in ['destroy','update','create']:
            permission_classes = [IsAuthenticated]
        else:
            permission_classes = [AllowAny]
        return [permission() for permission in permission_classes]
    
    # https://stackoverflow.com/questions/59720294/override-permission-and-authentication-classes-in-viewset-list-method``
    def get_authenticators(self):
        authentication_classes = [JWTCookieAuthentication]
        print('running')

        action_map = {key.lower(): value for key,
                      value in self.action_map.items()}
        action_name = action_map.get(self.request.method.lower())
        if action_name in ['destroy','create','update']:
            return [auth() for auth in authentication_classes]

        return []      

    def destroy(self, request, *args, **kwargs):
        blog = self.get_object()
        images = blog.images.all() # assume only one image but JIC safely grab all...
        if images:
            client = boto3.client(service_name='s3',
                                  region_name=settings.AWS_REGION,
                                  aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY,
                                  aws_access_key_id=settings.AWS_ACCESS_KEY_ID)

            for image in images:
                # remove all images from DB..
                client.delete_object(Bucket=settings.AWS_STORAGE_BUCKET_NAME,Key=image.image_key)         

            
        # images will cascade
        blog.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)   

    
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        blog = serializer.save()

        # Now time to take the images and store them on the client...
        images = request.FILES.getlist('image')

        if images:
            print('an image..')
            client = boto3.client(service_name='s3',
                                  region_name=settings.AWS_REGION,
                                  aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY,
                                  aws_access_key_id=settings.AWS_ACCESS_KEY_ID)
            # upload
            
            file_name = images[0].name + str(uuid4())
            client.upload_fileobj(images[0],settings.AWS_STORAGE_BUCKET_NAME,file_name)
            image_url = f"https://{settings.AWS_STORAGE_BUCKET_NAME}.s3.{settings.AWS_REGION}.amazonaws.com/{file_name}"
            Image.objects.create(blog=blog,image_key=file_name,url=image_url,image_type='B')

        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data,status=status.HTTP_201_CREATED,headers=headers)

    def retrieve(self, request, *args, **kwargs):

        key = kwargs.get('pk',None)
        if not key:
            return Response({'error': 'Blog does not exist'},status=status.HTTP_404_NOT_FOUND)
        
        self.get_queryset().filter(id=key).update(views=F('views') + 1)
        blog = self.get_object()
        serializer = self.get_serializer(blog)
        return Response(serializer.data,status=status.HTTP_200_OK)
    

    def list(self, request, *args, **kwargs):
        blogs = self.get_queryset()

        page = request.GET.get('page',1)
        size = request.GET.get('size', PAGE_SIZE)

        try:
            size = int(size)
        except ValueError:
            size = PAGE_SIZE

        paginator = Paginator(blogs,size)
        try:
            blogs = paginator.page(page)
        except PageNotAnInteger:
            blogs = paginator.page(1)
        except EmptyPage:
            blogs = paginator.page(paginator.num_pages)

        serializer = self.get_serializer(blogs,many=True)
        response_data = {
            'blogs':serializer.data,
            'total_pages':paginator.num_pages if len(blogs) != 0 else 0
        }

        return Response(response_data,status=status.HTTP_200_OK)
    
    def update(self, request, *args, **kwargs):
        blog = self.get_object()

        client = boto3.client(service_name='s3',
                region_name=settings.AWS_REGION,
                aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY,
                aws_access_key_id=settings.AWS_ACCESS_KEY_ID)

        # we need to delete all the images that exist in the database but dont exist in the data.
        images = request.data.get('image')
        if len(images) == 0: # case where we delete the image...
            images = blog.images.all()
            if images.exists():
                image = images.first()
                image.delete()
                client.delete_object(Bucket=settings.AWS_STORAGE_BUCKET_NAME,Key=image.image_key)



        



        # now create the new images if they exist.
        images = request.FILES.getlist('new_image')

        if len(images) != 0:
            # upload
            image = images[0]

            file_name = image.name + str(uuid4())
            client.upload_fileobj(image,settings.AWS_STORAGE_BUCKET_NAME,file_name)
            image_url = f"https://{settings.AWS_STORAGE_BUCKET_NAME}.s3.{settings.AWS_REGION}.amazonaws.com/{file_name}"
            Image.objects.create(blog=blog,image_key=file_name,url=image_url,image_type='B')
        
        serializer = self.get_serializer(instance=blog,data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        headers=self.get_success_headers(serializer.data)
        return Response(serializer.data,status=status.HTTP_200_OK,headers=headers) 
        