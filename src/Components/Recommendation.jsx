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
		};
		this.toggleExplanation = this.toggleExplanation.bind(this)
	}
	
	toggleExplanation(){
		console.log('toggle');
		const old = this.state.explanation;
		const invert = old ? false : true;
		console.log(invert)
		this.setState({
			explanation: !old
		})
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
				size = {'recommendation'}
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
				toggleExplanation = {this.toggleExplanation}
				
				danceability={this.props.danceability}
				energy={this.props.energy}
				happiness={this.props.happiness}
				popularity={this.props.popularity}
				sliderValueDict={this.props.sliderValueDict}
				
				seedId={this.props.seedId}
				seedTitle={this.props.seedTitle}
				seedArtist={this.props.seedArtist}
				seedAlbum={this.props.seedAlbum}
				seedPreview_url={this.props.seedPreview_url}
				
				colorDict={this.props.colorDict}
				iconDict={this.props.iconDict}
			
			
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
					album={this.props.album}
					preview_url={this.props.preview_url}
					handlerAddToPlaylist={this.props.handlerAddToPlaylist}
					search={false}
					toggleExplanation = {this.toggleExplanation}
					explanation={this.state.explanation}
				/>
				{this.state.explanation ? this.renderExplanation() : this.renderAlbum()}
				
			</div>
			</>
		)
	
	}
	
	
}

