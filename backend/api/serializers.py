from rest_framework import serializers
from .models import Project

class ProjectSerializer(serializers.ModelSerializer):


    class Meta:
        model = Project
        fields = '__all__'
        read_only_fields = ['views']


    def create(self, validated_data):
        project = Project.objects.create(**validated_data)
        project.save()
        return project
    
    def update(self, instance, validated_data):
        instance.title = validated_data.get('title','My Cool Project')
        instance.tagline = validated_data.get('tagline','A Personal Project')
        instance.views = validated_data.get('views',0)
        instance.description = validated_data.get('description','This is a personal Project that I created to test out my coding capabilities and skills')
        instance.created_on = validated_data['created_on']
        instance.repository = validated_data.get('repository',None)
        instance.save()
        return instance
    
class ProjectListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = ('id','title')
    