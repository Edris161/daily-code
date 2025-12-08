

# Create your models here.
from django.db import models


# -----------------------
# Hero Section
# -----------------------
class Hero(models.Model):
    image = models.ImageField(upload_to="home/images")
    description = models.TextField(max_length=500)
    title = models.CharField(max_length=400)
    discount = models.CharField(max_length=400)

    def __str__(self):
        return self.title[:100]


class Hero_List(models.Model):
    hero = models.ForeignKey(Hero, on_delete=models.CASCADE)
    li = models.CharField(max_length=400)

    def __str__(self):
        return self.li[:100]


# -----------------------
# Featured Section
# -----------------------
class Featured(models.Model):
    title = models.CharField(max_length=400)
    description = models.TextField()

    def __str__(self):
        return self.title


class Featured_list(models.Model):
    featured = models.ForeignKey(Featured, on_delete=models.CASCADE)
    title = models.CharField(max_length=400)
    description = models.TextField(max_length=1000)
    image = models.ImageField(upload_to="home/images")

    def __str__(self):
        return self.title


# -----------------------
# Trusted Section
# -----------------------
class Trusted(models.Model):
    image = models.ImageField(upload_to="home/images")
    link = models.URLField(null=True, blank=True)
    name = models.CharField(max_length=400)

    def __str__(self):
        return self.name


# -----------------------
# Experience Section
# -----------------------
class Experience(models.Model):
    sup_title = models.CharField(max_length=400)
    main_title = models.CharField(max_length=400)
    description = models.TextField(max_length=1000)
    image1 = models.ImageField(upload_to="home/images")
    image2 = models.ImageField(upload_to="home/images")

    def __str__(self):
        return self.main_title


class Program_services(models.Model):
    experience = models.ForeignKey(Experience, on_delete=models.CASCADE)
    list = models.TextField()

    def __str__(self):
        return self.list


class Achievements(models.Model):
    experience = models.ForeignKey(Experience, on_delete=models.CASCADE)
    number = models.FloatField()
    title = models.CharField(max_length=400)

    def __str__(self):
        return self.title


class Score(models.Model):
    experience = models.ForeignKey(Experience, on_delete=models.CASCADE)
    title = models.CharField(max_length=400)
    number = models.FloatField()

    def __str__(self):
        return self.title


