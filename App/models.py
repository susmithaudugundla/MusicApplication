from django.db import models

# Create your models here.
class Song(models.Model):
	song_name = models.CharField(max_length = 50)
	description = models.TextField(blank = True, null = True)
	createdAt = models.DateTimeField("Created At", auto_now_add = True)

	def __str__(self):
		return self.song_name

class PlayList(models.Model):
	play_list_name = models.CharField(max_length = 50)
	songs = models.ManyToManyField(Song)
	description = models.TextField(blank = True, null = True)
	createdAt = models.DateTimeField("Created At", auto_now_add = True)

	def __str__(self):
		return self.play_list_name