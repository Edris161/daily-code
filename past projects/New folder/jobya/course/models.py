from django.db import models


# Create your models here.


class Course(models.Model):
    title = models.CharField(max_length=400)
    description = models.TextField()
    def __str__(self):
        return self.title


class Blog_course(models.Model):
   batch = models.CharField(max_length=100)
   images = models.ImageField(upload_to="images/course")
   tital = models.CharField(max_length=400)
   discraption = models.TextField()
   duration = models.CharField(max_length=400)
   course_level = models.CharField(max_length=300)
   
 