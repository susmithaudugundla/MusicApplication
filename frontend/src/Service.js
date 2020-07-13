import axios from 'axios';
const URL = 'http://localhost:8000';

export default class Service{
	cunstructor(){

	}
	getPlayLists(){
		const url = `${URL}/api/`;
		return axios.get(url).then(response => response.data);
	}
	getPlayListsByURL(link){
		const url = `${URL}${link}`;
		return axios.get(url).then(response => response.data);
	}
	getSongsListsByURL(link){
		console.log(link);
		const url = `${URL}${link}`;
		console.log(url);
		return axios.get(url).then(response => response.data);
	}
	getSongs(id){
		const url = `${URL}/api/songs/${id}`;
		return axios.get(url).then(response => response.data);
	}
	addPlayList(playlist){
		console.log(playlist);
		const url = `${URL}/api/`;
		return axios.post(url,playlist);
	}
	addSong(song, id){
		console.log(song,id);
		const url = `${URL}/api/songs/${id}`;
		return axios.post(url,song);
	}
	sorsongs(id){
		console.log(id);
		const url = `${URL}/api/playlist/${id}`;
		return axios.get(url).then(response => response.data)
	}
	copySong(playlist,id){
		const url = `${URL}/api/copysong/${id}`;
		return axios.post(url,playlist);
	}
	deleteSong(playlist_id,id){
		const url = `${URL}/api/movesong/${id}/${playlist_id}`;
		return axios.delete(url);
	}
}