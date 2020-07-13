import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Route, Link } from 'react-router-dom';
import PlayList from './PlayList.js';
import SongsList from './SongsList.js';
import AddPlayList from './AddPlayList.js';
import AddSong from './AddSong.js';
import CopySong from './CopySong.js';
import MoveSong from './MoveSong.js';
import './App.css';

const View=()=>(

  <div className = "container-fluid">

    <nav className = "navbar navbar-expand-lg navbar-light bg-light">
      <div className = "navbar-nav">
        <a  className="nav-item nav-link"  href="/">PlayLists</a>
        <a  className="nav-item nav-link"  href="/playlist">Add PlayList</a>
      </div>
    </nav>

    <div className = "content">
      <Route path = "/" exact component = { PlayList } />
      <Route path = "/playlist/" exact component = { AddPlayList } />
      <Route path = "/playlist/:id" component = {SongsList}/>
      <Route path = "/addsong/:id" component = { AddSong }/>
      <Route path = "/copysong/:id" component = { CopySong }/>
      <Route path = "/movesong/:playlist/:song" component = { MoveSong }/>
    </div>
  </div>
)


class App extends Component{
  render(){
    return(
        <BrowserRouter>
          <View />
        </BrowserRouter>
      )
  }
}
export default App;
