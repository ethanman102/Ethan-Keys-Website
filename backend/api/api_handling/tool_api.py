from uuid import uuid4
from django.conf import settings
import boto3
from rest_framework import viewsets,status
from ..serializers import ToolSerializer
from ..models import Tool,Image
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated,AllowAny
from ..authenticate import JWTCookieAuthentication

class ToolViewSet(viewsets.ModelViewSet):

    serializer_class = ToolSerializer
    queryset = Tool.objects.all()
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
        tool = self.get_object()
        image = tool.image 
        if image:
            client = boto3.client(service_name='s3',
                                  region_name=settings.AWS_REGION,
                                  aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY,
                                  aws_access_key_id=settings.AWS_ACCESS_KEY_ID)

            client.delete_object(Bucket=settings.AWS_STORAGE_BUCKET_NAME,Key=image.image_key)         

            
        # images will cascade
        tool.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    def list(self, request, *args, **kwargs):
        tools = self.get_queryset()
        serializer = self.get_serializer(tools,many=True)  
        return Response({'tools' : serializer.data},status=status.HTTP_200_OK)
    
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        tool = serializer.save()

        # Now time to take the images and store them on the client...
        images = request.FILES.getlist('images')

        if images:
            client = boto3.client(service_name='s3',
                                  region_name=settings.AWS_REGION,
                                  aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY,
                                  aws_access_key_id=settings.AWS_ACCESS_KEY_ID)
            # upload
            file_name = images[0].name + str(uuid4())
            client.upload_fileobj(images[0],settings.AWS_STORAGE_BUCKET_NAME,file_name)
            image_url = f"https://{settings.AWS_STORAGE_BUCKET_NAME}.s3.{settings.AWS_REGION}.amazonaws.com/{file_name}"
            Image.objects.create(tool=tool,image_key=file_name,url=image_url,image_type='T')

        headers = self.get_success_headers(serializer.data)
        print(serializer.data,'hi')
        return Response(serializer.data,status=status.HTTP_201_CREATED,headers=headers)
    
    
    def update(self, request, *args, **kwargs):
        tool = self.get_object()

        client = boto3.client(service_name='s3',
                region_name=settings.AWS_REGION,
                aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY,
                aws_access_key_id=settings.AWS_ACCESS_KEY_ID)

        # we need to delete all the images that exist in the database but dont exist in the data.
        images = request.data.get('image')
        if not images: # case where we delete the image...
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
            Image.objects.create(tool=tool,image_key=file_name,url=image_url,image_type='T')
        
        serializer = self.get_serializer(instance=blog,data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        headers=self.get_success_headers(serializer.data)
        return Response(serializer.data,status=status.HTTP_200_OK,headers=headers) 
        