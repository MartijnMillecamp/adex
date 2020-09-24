import React, {Component} from 'react';

import styles from '../Styling/SearchResults.module.css';
import '../Styling/global.css'
import classnames from 'classnames'
import SearchResult from "../Components/SearchResult"










export default class SearchResults extends Component{
	
	
	checkPlaying(id){
		return this.props.playing === id
	}
	
	
	render(){
		const styleContainer = classnames('container-columns', styles.containerSearch);
		const list = this.props.results;
		console.log(list);
		return(
			<>
			<div
				className={styleContainer}
			>
					{list.map(song =>
						(
							<SearchResult
								key={"search_" + song.id}
								id={song.id}
								uri={song.uri}
								title={song.name}
								artist={song.artists[0]['name']}
								album={song.album.images[0]['url']}
								preview_url={song.preview_url}
								handlerAddToPlaylist={this.props.handlerAddToPlaylist}
								handlerPlaySong = {this.props.handlerPlaySong}
								handlerPauseSong = {this.props.handlerPauseSong}
								handlerStopSearch ={this.props.handlerStopSearch}
								playing = {this.checkPlaying(song.id)}
								handlerLogging = {this.props.handlerLogging}
							/>
						)
					)}
			</div>
			
			
			</>
		)
		
	}
	
	
}