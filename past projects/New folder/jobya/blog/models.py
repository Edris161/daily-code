from django.db import models

# -----------------------
# Blog Section
# -----------------------
class Blog(models.Model):
    title = models.CharField(max_length=400)
    description = models.TextField()

    def __str__(self):
        return self.title


# -----------------------
# Topic Section
# -----------------------
class Topic(models.Model):
    batch = models.CharField(max_length=100)
    image = models.ImageField(upload_to="images/topic")
    author = models.CharField(max_length=100)
    timestamp = models.DateTimeField(auto_now_add=True)
    title = models.CharField(max_length=400)
    description = models.TextField()

    def __str__(self):
        return self.title
