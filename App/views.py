from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status

from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from .models import *
from .serializers import *

@api_view(['GET', 'POST'])
def playlist(request):
	print("enter")
	if request.method == 'GET':
		data = []
		nextPage = 1
		prevPage = 1
		playlists = PlayList.objects.all()
		page = request.GET.get('page', 1)
		paginator = Paginator(playlists, 5)
		try:
			data = paginator.page(page)
		except PageNotAnInteger:
			data = paginator.page(1)
		except EmptyPage:
			data = paginator.page(paginator.num_pages)

		serializer = PlayListSerializer(data, context = {'request':request}, many = True)
		
		if data.has_next():
			nextPage = data.next_page_number()
		if data.has_previous():
			prevPage = data.previous_page_number()

		return Response({'data':serializer.data, 'count': paginator.count, 'numpages':paginator.num_pages, 'nextlink': '/api/?page='+str(nextPage), 'prevlink':'/api/?page='+str(prevPage)})

	elif request.method == 'POST':
		print("post")
		serializer = PlayListSerializer(data = request.data)
		if serializer.is_valid():
			serializer.save()
			return Response(serializer.data, status = status.HTTP_201_CREATED)
		return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'POST'])
def songslist(request,id):
	if request.method == 'GET':
		data = []
		nextPage = 1
		prevPage = 1
		fil = PlayList.objects.get(id = id)
		songs = fil.songs.all();
		page = request.GET.get('page', 1)
		paginator = Paginator(songs, 50)
		try:
			data = paginator.page(page)
		except PageNotAnInteger:
			data = paginator.page(1)
		except EmptyPage:
			data = paginator.page(paginator.num_pages)

		serializer = SongSerializer(data, context = {'request':request}, many = True)
		
		if data.has_next():
			nextPage = data.next_page_number()
		if data.has_previous():
			prevPage = data.previous_page_number()

		return Response({'data':serializer.data, 'count': paginator.count, 'numpages':paginator.num_pages, 'nextlink': '/api/songs/%d'%id+'/?page='+str(nextPage), 'prevlink':'/api/songs/%d'%id+'/?page='+str(prevPage)})

	elif request.method == 'POST':
		serializer = SongSerializer(data = request.data)
		#serializer = PlayListSerializer(data = request.data)
		if serializer.is_valid():
			serializer.save()
			song_id = Song.objects.get(song_name = request.data['song_name'])
			playlist = PlayList.objects.get(id = id)
			playlist.songs.add(song_id)
			return Response(serializer.data, status = status.HTTP_201_CREATED)
		return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def modifieslist(request, id):
	if request.method == 'GET':
		data = []
		nextPage = 1
		prevPage = 1
		fil = PlayList.objects.get(id = id)
		songs = fil.songs.all().order_by("song_name");
		print(songs)
		page = request.GET.get('page', 1)
		paginator = Paginator(songs, 10)
		try:
			data = paginator.page(page)
		except PageNotAnInteger:
			data = paginator.page(1)
		except EmptyPage:
			data = paginator.page(paginator.num_pages)

		serializer = SongSerializer(data, context = {'request':request}, many = True)
		
		if data.has_next():
			nextPage = data.next_page_number()
		if data.has_previous():
			prevPage = data.previous_page_number()

		return Response({'data':serializer.data, 'count': paginator.count, 'numpages':paginator.num_pages, 'nextlink': '/api/songs/?page='+str(nextPage), 'prevlink':'/api/songs/?page='+str(prevPage)})

@api_view(['POST'])
def copysong(request,id):
	if request.method == 'POST':
		playlist = PlayList.objects.get(play_list_name = request.data['playlist_name'])
		song = Song.objects.get(id = id)
		playlist.songs.add(song)
		#return Response(serializer.data, status = status.HTTP_201_CREATED)

@api_view(['DELETE'])
def movesong(request, song,playlist):
	if request.method == 'DELETE':
		playlist = PlayList.objects.get(id = playlist)
		song = playlist.songs.get(id = song)
		playlist.songs.remove(song)
