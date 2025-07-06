from django.db import models

# Create your models here.
class Project(models.Model):
    
    title = models.CharField(max_length=50, null=False, blank=False)
    tagline = models.CharField(max_length=50, null=False, blank=False)
    description = models.CharField(max_length=5000,null=False,blank=False)
    created_on = models.DateTimeField()
    views = models.IntegerField(default=0,blank=False, null=False)
    repository = models.URLField(blank=True,null=True,default=None)
    youtube_id = models.CharField(max_length=500,blank=True,null=True,default=None)