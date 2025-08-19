from rest_framework import serializers
from .models import Project,Tool,Image,Blog,User

# Parent Class Image Serializer. Acts as a Base Class :D
class BaseImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Image
        fields = ('image_key','id','url','created_on','image_type')
        read_only_fields = ['created_on']

# https://stackoverflow.com/questions/49900629/django-serializer-inherit-and-extend-fields
# Shows how to inherit fields from the base serializer to add on the additional field :D
class BlogImageSerializer(BaseImageSerializer):
    blog_id = serializers.ReadOnlyField(source='blog.id')
    
    class Meta:
        model = Image
        fields = BaseImageSerializer.Meta.fields + ('blog_id',)
        
class ToolImageSerializer(BaseImageSerializer):
    tool_id = serializers.ReadOnlyField(source='tool.id')
    
    class Meta:
        model = Image
        fields = BaseImageSerializer.Meta.fields + ('tool_id',)

class ProjectImageSerializer(BaseImageSerializer):
    project_id = serializers.ReadOnlyField(source='project.id')
    
    class Meta:
        model = Image
        fields = BaseImageSerializer.Meta.fields + ('project_id',)

# Tool Serializer Logic     
class ToolSerializer(serializers.ModelSerializer):
    image = ToolImageSerializer(read_only=True)
    class Meta:
        model = Tool
        fields = "__all__"
        extra_kwargs = {
            'created_on' : {'read_only' : True},
            'name' : {'validators' : []} # required to remove name unique identifier if we are updating the object yaknow....
        }
    
# Project Serialziers
class ProjectSerializer(serializers.ModelSerializer):

    tools = ToolSerializer(many=True,required=False)
    images = ProjectImageSerializer(many=True,read_only=True)

    class Meta:
        model = Project
        fields = '__all__'
        read_only_fields = ['views']


    def create(self, validated_data):
        tools_data = validated_data.pop('tools',[])
        project = Project.objects.create(**validated_data)

        # for allowance of creating new objects with tools already created.
        for tool in tools_data:
            if tool == "":
                continue
            tool_obj = Tool.objects.get_or_create(**tool)[0]
            project.tools.add(tool_obj)

        project.save()
        return project
    
    def update(self, instance, validated_data):

        tools_data = validated_data.pop('tools',[])
        instance.tools.set([])
        for tool in tools_data:
            tool_obj = Tool.objects.get_or_create(**tool)[0]
            instance.tools.add(tool_obj)

        # Notice views is removed in oerder to prevent views read only field from being defaulted back to 0.
        instance.title = validated_data.get('title','My Cool Project')
        instance.tagline = validated_data.get('tagline','A Personal Project')
        instance.description = validated_data.get('description','This is a personal Project that I created to test out my coding capabilities and skills')
        instance.created_on = validated_data['created_on']
        instance.repository = validated_data.get('repository',None)
        instance.save()
        return instance
    
class ProjectListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = ('id','title')

# Blog Serializers...
class BlogSerializer(serializers.ModelSerializer):
    images = BlogImageSerializer(many=True,read_only=True)

    class Meta:
        model = Blog
        fields = "__all__"
        read_only_fields = ['views','created_on']


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id','name','email','password']
        read_only_fields = ['id']
        extra_kwargs = {
            'password' : {'write_only' : True}
        }
