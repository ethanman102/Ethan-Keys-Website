from django.db import models

IMAGE_TYPES = (
    ('P','Project'),
    ('B','Blog')
)
# Create your models here.
class Project(models.Model):
    
    title = models.CharField(max_length=50, null=False, blank=False)
    tagline = models.CharField(max_length=50, null=False, blank=False)
    description = models.CharField(max_length=5000,null=False,blank=False)
    created_on = models.DateTimeField()
    views = models.IntegerField(default=0,blank=False, null=False)
    repository = models.URLField(blank=True,null=True,default=None)
    youtube_id = models.CharField(max_length=500,blank=True,null=True,default=None)

class Image(models.Model):
    image_type = models.CharField(max_length=1,null=False,blank=False,choices=IMAGE_TYPES)
    url = models.URLField(null=False,blank=False)
    created_on = models.DateTimeField(auto_now_add=True)
    project = models.ForeignKey('Project',on_delete=models.CASCADE,null=True,related_name='images')
    blog = models.ForeignKey('Blog',on_delete=models.CASCADE,null=True,related_name='images')
    image_key=models.CharField(max_length=1000,null=False,blank=False)


class Blog(models.Model):
    created_on = models.DateTimeField(auto_now_add=True)
    title = models.CharField(max_length=250,blank=False,null=False)
    content = models.CharField(max_length=10000,null=False,blank=False)