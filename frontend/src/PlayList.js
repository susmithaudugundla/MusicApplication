import React, { Component } from 'react';
import Service from './Service';

const playListService = new Service();

class PlayList extends Component {
	constructor(props){
		super(props);
		this.state = {
			playLists: [],
			nextPageURL: ''
		}
		this.nextPage = this.nextPage.bind(this);
		this.songsList = this.songsList.bind(this);
		//this.handleDelete = this.handleDelete.bind(this);
	}
	componentDidMount(){
		const self = this
		playListService.getPlayLists().then(function(result){
			console.log(result.data);
			self.setState({playLists: result.data, nextPageURL: result.nextlink})
		})
	}
	nextPage(){
		const self = this;
		playListService.getPlayListsByURL(this.state.nextPageURL).then((result)=>{
			self.setState({playLists: result.data, nextPageURL:result.nextlink})
		});
	}
	songsList(id){
		//alert(event.target.key.value);
		window.location.href=`/playlist/${id}`;
	}
	render(){
		return(
			<div className="container">
				<table className="table">
					<thead key="thead">
						<tr>
						<th>Id</th>
						<th>PlayList name</th>
						<th>Description</th>
						</tr>
					</thead>
					<tbody>
						{this.state.playLists.map(list =>
							<tr key={list.id} onClick={() => this.songsList(list.id)}>
								<td> {list.id} </td>
								<td> {list.play_list_name} </td>
								<td> {list.description} </td>
							</tr>
							)}
					</tbody>
				</table>
				<button className="btn btn-primary ml-auto" onClick={this.nextPage}>Next</button>			
			</div>
		)
	}
}

export default PlayList;
