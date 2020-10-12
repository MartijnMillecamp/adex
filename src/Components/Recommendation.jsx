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
			explanation: this.props.allExplanation
		};
		this.toggleExplanation = this.toggleExplanation.bind(this);
		this.checkShaking = this.checkShaking.bind(this);
	}
	
	
	componentDidUpdate(prevProps, prevState){
		if (prevProps.allExplanation !== this.props.allExplanation){
			this.setState({explanation: this.props.allExplanation})
		}
	}
	
	
	
	
	
	toggleExplanation(){
		const old = this.state.explanation;
		this.setState({
			explanation: !old,
		});
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
				handlerLogging={this.props.handlerLogging}
			
			/>
		)
	}
	
	renderExplanation(){
		return(
			<ExplanationFull
				key={"exp_" + this.props.id}
				id={this.props.id}
				uri={this.props.uri}
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
				
				handlerLogging={this.props.handlerLogging}
			
			
			/>
		)
	}
	
	switchRenderAlbumExplanation(){
		return(
			this.state.explanation ? this.renderExplanation() : this.renderAlbum()
		)
	}
	
	checkShaking(){
		const styleContainerRec = classnames("container-rows", styles.containerRec);
		const styleContainerRecShake = classnames("container-rows", styles.containerRec, styles.shake);
		if (this.props.shaking){
			return styleContainerRecShake
		}
		else{
			return styleContainerRec
		}
	}
	
	render(){
		
		
		return(
			<>
			<div className={this.checkShaking()}>
				<SongInfo
					key={"songinfo_" + this.props.id}
					id={this.props.id}
					uri={this.props.uri}
					title={this.props.title}
					artist={this.props.artist}
					album={this.props.album}
					preview_url={this.props.preview_url}
					handlerAddToPlaylist={this.props.handlerAddToPlaylist}
					search={false}
					toggleExplanation = {this.toggleExplanation}
					explanation={this.state.explanation}
					handlerLogging={this.props.handlerLogging}
				/>
				{this.switchRenderAlbumExplanation()}
				
			</div>
			</>
		)
	
	}
	
	
}

