from django.contrib import admin
from .models import Project,Image,Blog,User
# Register your models here.
admin.site.register(Project)
admin.site.register(Image)
admin.site.register(Blog)
admin.site.register(User)
