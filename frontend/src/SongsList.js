import React, { Component } from 'react';
import Service from './Service';

const songsService = new Service();

class SongsList extends Component {
	constructor(props){
		super(props);
		this.state = {
			songsLists: [],
			nextPageURL: ''
		}
		this.nextPage = this.nextPage.bind(this);
		this.addSong = this.addSong.bind(this);
		this.sortSongs = this.sortSongs.bind(this);
	}
	componentDidMount(){
		const { match: { params } } = this.props;
		const self = this;
		songsService.getSongs(params.id).then(function(result){
			console.log(result.data);
			self.setState({songsLists: result.data, nextPageURL: result.nextlink})
		})
	}
	sortSongs(){
		const { match: {params} } = this.props;
		const self = this;
		songsService.sorsongs(params.id).then(function(result){
			self.setState({songsLists: result.data, nextPageURL: result.nextlink})
		})
	}
	addSong(){
		const { match: {params} } = this.props;
		window.location.href=`/addsong/${params.id}`;
	}
	nextPage(){
		const self = this;
		songsService.getSongsListsByURL(this.state.nextPageURL).then((result)=>{
			self.setState({songsLists: result.data, nextPageURL:result.nextlink})
		});
	}
	render(){
		const { match: {params} } = this.props;
		return(
			<div className="container">
				<table className="table">
					<thead key="thead">
						<tr>
							<td><button className="btn btn-primary" onClick={this.addSong}>Add Song</button></td>
							<td></td>
							<td></td>
							<td><button className="btn btn-primary" onClick={this.sortSongs}>Sort the songs</button></td>
						</tr>
						<tr>
							<th>Id</th>
							<th>Song name</th>
							<th>Description</th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						{this.state.songsLists.map(list =>
							<tr key={list.pk}>
								<td> {list.id} </td>
								<td> {list.song_name} </td>
								<td> {list.description} </td>
								<td>
									<a  href={"/copysong/"+list.id}> Copy Song </a>
									<br/>
									<a  href={"/movesong/"+params.id+"/"+list.id}> Transfer Song </a>	
								</td>
							</tr>
							)}
					</tbody>
				</table>
				<button className="btn btn-primary" onClick={this.nextPage}>Next</button>			
							
			</div>
		)
	}
}

export default SongsList;
