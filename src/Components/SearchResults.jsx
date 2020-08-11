import React, {Component} from 'react';

import styles from '../Styling/SearchResults.module.css';
import '../Styling/global.css'
import classnames from 'classnames'
import ReactTooltip from "react-tooltip";
import SearchResult from "../Components/SearchResult"




import Album from "./Album";






export default class SearchResults extends Component{
	
	constructor(props){
		super(props)
	}
	
	
	render(){
		const styleContainer = classnames('container-columns', styles.containerSearch);
		const list = this.props.results;
		
		return(
			<>
			<div
				className={styleContainer}
			>
				<div>
					{list.map(song =>
						(
							<SearchResult
								key={"search_" + song.id}
								id={song.id}
								title={song.name}
								artist={song.artists[0]['name']}
								album={song.album.images[0]['url']}
								handlerAddToPlaylist={this.props.addToPlaylist}
								handlerPlaySong = {this.props.handlerPlaySong}
								handlerPauseSong = {this.props.handlerPauseSong}
								playing = {this.props.playing}
							/>
						)
					)}
				</div>
			</div>
			
			
			</>
		)
		
	}
	
	
}