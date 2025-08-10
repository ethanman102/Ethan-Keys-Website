from uuid import uuid4
from django.conf import settings
import boto3
from rest_framework import viewsets,status
from ..serializers import ProjectSerializer,ProjectListSerializer
from ..models import Project,Image
from rest_framework.response import Response
from django.db.models import F

class ProjectViewSet(viewsets.ModelViewSet):
    serializer_class = ProjectSerializer
    queryset = Project.objects.all()
    http_method_names = ['get','post','delete','put']

    def get_serializer_class(self):
        # RESOURCE: https://stackoverflow.com/questions/22616973/django-rest-framework-use-different-serializers-in-the-same-modelviewset
        # ANSWERED BY: user133688 on March 31, 2014
        # Purpose: How to use multiple serializers in the same viewset.
        if self.action == 'list':
            return ProjectListSerializer
        return ProjectSerializer

    # Overidden Create Method Utilized to create and store the images on AWS S3 bucket servers.

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        project = serializer.save()

        # Now time to take the images and store them on the client...
        images = request.FILES.getlist('images')

        if images:
            client = boto3.client(service_name='s3',
                                  region_name=settings.AWS_REGION,
                                  aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY,
                                  aws_access_key_id=settings.AWS_ACCESS_KEY_ID)
            # upload
            for image in images:
                file_name = image.name + str(uuid4())
                client.upload_fileobj(image,settings.AWS_STORAGE_BUCKET_NAME,file_name)
                image_url = f"https://{settings.AWS_STORAGE_BUCKET_NAME}.s3.{settings.AWS_REGION}.amazonaws.com/{file_name}"
                Image.objects.create(project=project,image_key=file_name,url=image_url,image_type='P')

        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data,status=status.HTTP_201_CREATED,headers=headers)
    
    def destroy(self, request, *args, **kwargs):
        project = self.get_object()
        images = project.images.all()

        if images:
            client = boto3.client(service_name='s3',
                                  region_name=settings.AWS_REGION,
                                  aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY,
                                  aws_access_key_id=settings.AWS_ACCESS_KEY_ID)

            for image in images:
                # remove all images from DB..
                client.delete_object(Bucket=settings.AWS_STORAGE_BUCKET_NAME,Key=image.image_key)         

            
        # images will cascade
        project.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)   

    
    # List method retrieves only ids and titles to reduce query time and bandwidth for simple queries...
    def list(self, request, *args, **kwargs):
        projects = self.get_queryset()
        serializer = self.get_serializer(projects,many=True)

        return Response({'projects' : serializer.data},status=status.HTTP_200_OK)
    
    def retrieve(self, request, *args, **kwargs):

        key = kwargs.get('pk',None)
        if not key:
            return Response({'error': 'Project does not exist'},status=status.HTTP_404_NOT_FOUND)
        
        self.get_queryset().filter(id=key).update(views=F('views') + 1)
        project = self.get_object()
        serializer = self.get_serializer(project)
        return Response(serializer.data,status=status.HTTP_200_OK)
    
    def update(self,request,*args,**kwargs):
        project = self.get_object()

        # we need to delete all the images that exist in the database but dont exist in the data.
        images = request.data.get('images')
        current_images = project.images.all()

        urls = [image['url'] for image in images]

        client = boto3.client(service_name='s3',
                        region_name=settings.AWS_REGION,
                        aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY,
                        aws_access_key_id=settings.AWS_ACCESS_KEY_ID)


        images_to_delete = current_images.exclude(url__in=urls)

        

        # now the current images left over are the ones we need to delete from both the database and the s3 bucket...

        if images_to_delete.exists():
            for image in images_to_delete:
                # remove all images from DB..
                client.delete_object(Bucket=settings.AWS_STORAGE_BUCKET_NAME,Key=image.image_key)
                image.delete() # delete from db..

        # now create the new images if they exist.
        images = request.FILES.getlist('new_images')

        if images:
            # upload
            for image in images:
                file_name = image.name + str(uuid4())
                client.upload_fileobj(image,settings.AWS_STORAGE_BUCKET_NAME,file_name)
                image_url = f"https://{settings.AWS_STORAGE_BUCKET_NAME}.s3.{settings.AWS_REGION}.amazonaws.com/{file_name}"
                Image.objects.create(project=project,image_key=file_name,url=image_url,image_type='P')
        
        serializer = self.get_serializer(instance=project,data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        headers=self.get_success_headers(serializer.data)
        return Response(serializer.data,status=status.HTTP_200_OK,headers=headers)
        
