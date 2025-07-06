from django.shortcuts import get_object_or_404
from rest_framework import viewsets,status
from ..serializers import ProjectSerializer,ProjectListSerializer
from ..models import Project
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

    

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data,status=status.HTTP_201_CREATED,headers=headers)
    
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
        self.get_object()
        serializer = self.get_serializer(project)
        return Response(serializer.data,status=status.HTTP_200_OK)
        