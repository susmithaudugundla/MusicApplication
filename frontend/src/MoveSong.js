import React, { Component } from 'react';
import Services from './Service';

const SongsServices = new Services();
class MoveSong extends Component{
	constructor(props){
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.moveSong = this.moveSong.bind(this);
	}
	moveSong(){
		const {match:{params}} = this.props;
		SongsServices.deleteSong(params.playlist,params.song).then((result)=>{
			console.log(result);
		});
	}
	handleSubmit(event){
		const {match:{params}} = this.props;
		var playlist_name = event.target.playlist_name.value;
		event.preventDefault();
		SongsServices.copySong({
			"playlist_name":event.target.playlist_name.value
		},params.song).then((result)=>{
			console.log(result);
		});
		event.target.playlist_name.value = "";
		this.moveSong();
	}
	render(){
		return(
			<div className="container">
				<form onSubmit={this.handleSubmit}>
					<div className="form-group">
						<label className="form-label">PlayList Name:</label>
						<input className="form-control" type="text" name="playlist_name" placeholder="Enter PlayList Name"/>
						<br/>					
						<input className="btn btn-large btn-primary" type="submit" value="Create"/>
					</div>
				</form>
			</div>
		)
	}
}

export default MoveSong;