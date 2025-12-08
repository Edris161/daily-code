from django.db import models

# Create your models here.
class Program(models.Model):
    tital = models.CharField(max_length=300)
    discripation = models.TextField()
    def __str__(self):
     return self.tital



class Card(models.Model):
   tital = models.CharField(max_length=300)
   discripation = models.TextField()
def __str__(self):
        return self.tital         
    