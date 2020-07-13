from rest_framework import serializers
from .models import *

class SongSerializer(serializers.ModelSerializer):
	class Meta:
		model = Song
		fields = ('id', 'song_name', 'description')

class PlayListSerializer(serializers.ModelSerializer):
	class Meta:
		model = PlayList
		fields = ('id','play_list_name', 'description')