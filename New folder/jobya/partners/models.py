from django.db import models

# Create your models here.
class adu_partners(models.Model):
    title = models.CharField(max_length=400)
    discraptions = models.TextField()
     
    def __str__(self):
        return self.title
    

      
      
class feature(models.Model):
    title = models.CharField(max_length=400)
    discraptions = models.TextField()
    image = models.ImageField(upload_to='images/partners')

    def __str__(self):
        return self.title
