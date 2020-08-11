import React, {Component} from 'react'
import SongInfo from './SongInfo'
import Album from './Album'
import styles from '../Styling/Recommendation.module.css';
import classnames from 'classnames'


export default class Recommendation extends Component{
	constructor(props){
		super(props)
	}
	
	
	
	render(){
		const styleContainerRec = classnames("container-rows", styles.containerRec);
		return(
			<>
			<div className={styleContainerRec}>
				<SongInfo
					key={"songinfo_" + this.props.id}
					id={this.props.id}
					title={this.props.title}
					artist={this.props.artist}
					handlerAddToPlaylist={this.props.handlerAddToPlaylist}
					search={false}
				/>
				<Album
					key={"album_" + this.props.id}
					id={this.props.id}
					album={this.props.album}
					preview_url={this.props.preview_url}
					handlerPlaySong = {this.props.handlerPlaySong}
					handlerPauseSong = {this.props.handlerPauseSong}
					playing = {this.props.playing}
					small = {false}
					playable = {true}
				
				/>
			</div>
			</>
		)
	
	}
	
	
}

