import React, {Component} from 'react';

import styles from '../Styling/SearchResult.module.css';
import '../Styling/global.css'
import classnames from 'classnames'
import Album from './Album'
import ReactTooltip from "react-tooltip";



export default class SearchResult extends Component{
	
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
					preview={this.props.preview}
					handlerPlaySong = {this.props.handlerPlaySong}
					handlerPauseSong = {this.props.handlerPauseSong}
					playing = {this.props.playing}
					small = {true}
					playable = {false}
				/>
			</div>
		)
		
	}
	
	
}