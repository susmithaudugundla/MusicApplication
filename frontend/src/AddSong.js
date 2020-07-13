import React, { Component } from 'react';
import Services from './Service';

const SongsServices = new Services();
class AddSong extends Component{
	constructor(props){
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	handleSubmit(event){
		const {match:{params}} = this.props;
		var song_name = event.target.song.value;
		event.preventDefault();
		SongsServices.addSong({
			"song_name":event.target.song.value,
			"description":event.target.desc.value
		},params.id).then((result)=>{
			alert(`${song_name} is added`);
		});
		event.target.song.value = "";
		event.target.desc.value = "";
	}
	render(){
		return(
			<div className="container">
				<form onSubmit={this.handleSubmit}>
					<div className="form-group">
						<label className="form-label">Song Name:</label>
						<input className="form-control" type="text" name="song" placeholder="Song Name"/>
						<label className="form-label">Song Description:</label>
						<br/>
						<textarea name="desc" rows="4" cols="50"></textarea>	
						<br/>					
						<input className="btn btn-large btn-primary" type="submit" value="Create"/>
					</div>
				</form>
			</div>
		)
	}
}

export default AddSong;