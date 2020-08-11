import React, {Component} from 'react';

import styles from '../Styling/SearchResult.module.css';
import '../Styling/global.css'
import classnames from 'classnames'
import Album from './Album'
import SongInfo from './SongInfo'
import ReactTooltip from "react-tooltip";
import addToPlaylist from '../Images/addToPlaylist.svg'




export default class SearchResult extends Component{
	//TODO remove search after adding
	constructor(props){
		super(props);
		
	}
	
	
	render(){
		const styleContainer = classnames('container-columns', styles.container)
		return(
			<div
				className={styleContainer}
			>
				<Album
					key={"search_album_" + this.props.id}
					id={this.props.id}
					album={this.props.album}
					preview_url={this.props.preview_url}
					handlerPlaySong = {this.props.handlerPlaySong}
					handlerPauseSong = {this.props.handlerPauseSong}
					playing = {this.props.playing}
					small = {true}
					playable = {false}
				/>
				<SongInfo
					key={"songinfo_search_" + this.props.id}
					id={this.props.id}
					title={this.props.title}
					artist={this.props.artist}
					handlerAddToPlaylist={this.props.handlerAddToPlaylist}
					album={this.props.album}
					preview_url={this.props.preview_url}
					search={true}
					handlerStopSearch={this.props.handlerStopSearch}
					
				/>
			</div>
		)
		
	}
	
	
}