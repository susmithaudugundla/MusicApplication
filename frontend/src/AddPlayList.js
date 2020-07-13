import React, { Component } from 'react';
import Services from './Service';

const PlayListServices = new Services();
class AddPlayList extends Component{
	constructor(props){
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	handleSubmit(event){
		var playList_name = event.target.name.value;
		event.preventDefault();
		PlayListServices.addPlayList({
			"play_list_name":event.target.name.value,
			"description":event.target.desc.value
		}).then((result)=>{
			alert(`${playList_name} PlayList created`);
		});
		event.target.name.value = "";
		event.target.desc.value = "";
	}
	render(){
		return(
			<div className="container">
				<form onSubmit={this.handleSubmit}>
					<div className="form-group">
						<label className="form-label">PlayList Name:</label>
						<input className="form-control" type="text" name="name"/>
						<label className="form-label">PlayList Description:</label>
						<input className="form-control" type="textarea" name="desc"/>
						<input className="btn btn-large btn-primary" type="submit" value="Create"/>
					</div>
				</form>
			</div>
		)
	}
}

export default AddPlayList;