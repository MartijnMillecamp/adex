import React, {Component} from 'react';

import styles from '../Styling/SearchResults.module.css';
import '../Styling/global.css'
import classnames from 'classnames'
import SearchResult from "../Components/SearchResult"










export default class SearchResults extends Component{
	constructor(props){
		super(props)
		this.stopSearch = this.stopSearch.bind(this);
	}
	
	
	checkPlaying(id){
		return this.props.playing === id
	}
	
	stopSearch(){
		this.props.handlerStopSearch();
	}
	
	
	
	
	
	render(){
		const styleContainer = classnames('container-columns', styles.containerSearch);
		const styleDeleteDiv = classnames(styles.deleteDiv);
		const list = this.props.results;
		return(
			<>
			<div
				className={styleContainer}
			>
				<div
					className={styleDeleteDiv}
				>
				
				</div>
				
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