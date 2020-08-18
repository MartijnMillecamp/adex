import React, {Component} from 'react'
import SongInfo from './SongInfo'
import Album from './Album'
import ExplanationFull from './ExplanationFull'
import styles from '../Styling/Recommendation.module.css';
import classnames from 'classnames'


export default class Recommendation extends Component{
	constructor(props){
		super(props);
		this.state = {
			explanation: true
		}
	}
	
	renderAlbum(){
		return(
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
		)
	}
	
	renderExplanation(){
		return(
			<ExplanationFull
				key={"exp_" + this.props.id}
				id={this.props.id}
				album={this.props.album}
				preview_url={this.props.preview_url}
				handlerPlaySong = {this.props.handlerPlaySong}
				handlerPauseSong = {this.props.handlerPauseSong}
				playing = {this.props.playing}
				playable = {true}
				
				danceability={this.props.danceability}
				energy={this.props.energy}
				happiness={this.props.happiness}
				popularity={this.props.popularity}
				sliderValueDict={this.props.sliderValueDict}
			
			
			/>
		)
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
				{this.state.explanation ? this.renderExplanation() : this.renderExplanation()}
				
			</div>
			</>
		)
	
	}
	
	
}

