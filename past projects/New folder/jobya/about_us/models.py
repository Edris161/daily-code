from django.db import models

# Create your models here.
class about_us(models.Model):
    title = models.CharField(max_length=200)
    discription = models.TextField()
    def __str__(self):
        return self.title


class history(models.Model):
    year = models.CharField(max_length=50)
    discription = models.TextField()
    def __str__(self):
        return self.year


class team (models.Model):
    sub_title = models.CharField(max_length=200)
    tital = models.CharField(max_length=400)
    discription = models.TextField()
    def __str__(self):
            return self.sub_title


class stuff (models.Model):
    image = models.ImageField(upload_to ='about_us/')
    full_name = models.CharField(max_length=200)
    job_title = models.TextField()
    def __str__(self):
            return self.full_name
    
