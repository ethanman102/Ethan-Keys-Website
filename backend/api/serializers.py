from rest_framework import serializers
from .models import Project,Tool

class ToolSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tool
        fields = "__all__"
        extra_kwargs = {
            'created_on' : {'read_only' : True},
            'name' : {'validators' : []} # required to remove name unique identifier if we are updating the object yaknow....
        }

    

class ProjectSerializer(serializers.ModelSerializer):

    tools = ToolSerializer(many=True)

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

