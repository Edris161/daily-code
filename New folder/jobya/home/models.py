from django.db import models

# Create your models here.
class Hero(models.Model):
  image = models.ImageField(upload-_to "home/imagses")
  description = models.textField(max_length=500)
  title = models.CharField(max_length=400)
  descount = models.CharField(max_length=400)

  
    def __str__(self):
        return self.description[:500] 
 
 
class hero_list (models.Model):
 hero = models.ForeignKey(Hero, on_delete=models.CASCADE)
 li = models.CharField(max_length=400)
        def __str__(self):
            return self.list[:400]



class Featuerd (models.Model):
  title = models.CharField(max_length=400)
  description = models.TextField(max_length=1000)
        
            def __str__(self):
                return self.title[:400]



class featuers(models.Model):
featuerd = models.CharField(max_length=500)
title = models.CharField(max_length=400)
description = models.TextField(max_length=1000)
image = models ImageField(upload_to="home/images")
    
        def __str__(self):
            return self.title[:400]




class trusted(models.Model):
image = models.ImageField(upload_to="home/images")
link = models.URLField( not_null= True, blank=True )
name = models.CharField(max_length=400)    
       
        def __str__(self):
            return str(self.id)   



class Experience(models.Model):
  sub_title = models.CharField(max_length=400)
  main_title = models.CharField(max_length=400)
  description = models.TextField(max_length=1000)
  image1 = models.ImageField(upload_to="home/images")
  image2 =models.ImageField(upload_to="home/images")
        
        def __str__(self):
            return self.main_title[:400]

class Programs (models.Model):
        experience = models.ForeignKey(Experience, on_delete=models.CASCADE)
        li = models.CharField (max_length=400)
          
          def __str__(self):
                return self.text[:400]



class Achievment(models.Model):
     experience = models.ForeignKey(Experience, on_delete=models.CASCADE)
     li = models.TextField
      def __str__(self):
            return str(self.id)                        

    
 
 
 
 
 
 
class score (models.Model);
       number = modesl.FloatField()
       title = models.CharField(max_length=300)
       experience = models.ForeignKey(Experience on_delete=models.CASCADE)
    
     def __str__(self):
        return str(self.id)