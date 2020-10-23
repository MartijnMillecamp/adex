import React, {Component} from 'react'
import Recommendation from "./Recommendation";
import styles from '../Styling/Recommendations.module.css';
import classnames from 'classnames'
import spinner from '../Images/spinner.gif'
import Switch from "react-switch";



export default class Recommendations extends Component {
	constructor(props){
		super(props);
		this.toggleExplanations = this.toggleExplanations.bind(this);
		this.checkShaking = this.checkShaking.bind(this);
	}
	
	
	
	
	checkPlaying(id){
		return this.props.playing === id
	}
	
	toggleExplanations(){
		this.props.handlerToggleAllExplanations();
		const toggled = !this.props.allExplanations;
		if (toggled){
			this.props.handlerLogging('openAllExplanations', 'click', 1);
		}
		else{
			this.props.handlerLogging('closeAllExplanations', 'click', 1);
		}
	}
	
	checkShaking(id){
		return this.props.shakeId === id
	}
	
	
	renderList(list){
		return (
			list.map(rec =>
				(
					<Recommendation
						key={"rec_" + rec.id}
						id={rec.id}
						uri={rec.uri}
						title={rec.name}
						artist={rec.artists[0]['name']}
						album={rec.album.images[1].url}
						preview_url={rec.preview_url}
						
						seedId={rec.seedId}
						seedTitle={rec.seedTitle}
						seedArtist={rec.seedArtist}
						seedAlbum={rec.seedAlbum}
						seedPreview_url={rec.seedPreview_url}
						
						danceability={rec.danceability}
						energy={rec.energy}
						happiness={rec.valence}
						popularity={rec.popularity}
						sliderValueDict={this.props.sliderValueDict}
						
						handlerPlaySong = {this.props.handlerPlaySong}
						handlerPauseSong = {this.props.handlerPauseSong}
						playing = {this.checkPlaying(rec.id)}
						handlerAddToPlaylist = {this.props.handlerAddToPlaylist}
						
						colorDict={this.props.colorDict}
						iconDict={this.props.iconDict}
						
						allExplanation={this.props.allExplanations}
						handlerLogging={this.props.handlerLogging}
						shaking={this.checkShaking(rec.id)}
						version={this.props.version}
						
					/>
				)
			)
		)
	}
	
	renderUpdate(){
		const spinnerStyle =classnames(styles.spinner)
		return (
			<>
			<img
				src={spinner}
				alt="loading..."
				key="spinner"
				className={spinnerStyle}
			/>
			</>
		)
	}
	
	renderEmpty(){
		const styleEmpty = classnames(styles.empty)
		return (
			<span
				className={styleEmpty}
			>
				Sorry, we could not find good recommendations.
				Please change your features or add a new song as source in your playlist.
			</span>
		)
	}
	
	renderSwitch(list){
		if (this.props.status === 'empty'){
			return this.renderEmpty()
		}
		else if (this.props.status === 'updating'){
			return this.renderUpdate()
		}
		else if (this.props.status === 'finished'){
			return this.renderList(list)
		}
		else{
			this.renderList(list)
		}
	}
	
	renderToggle() {
		const styleSpan = classnames(styles.span)
		
		return (
			<label>
						<span
							className={styleSpan}
						>Show explanations</span>
				<Switch
					onColor="#6EAD7C"
					onHandleColor="#BDE1C5"
					handleDiameter={20}
					uncheckedIcon={false}
					checkedIcon={false}
					boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
					activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
					height={15}
					width={36}
					className="react-switch"
					id="material-switch"
					onChange={this.toggleExplanations}
					checked={this.props.allExplanations}
					key={'toggleExplanations'}
				/>
			</label>
		)
		
	};
	
	
	render(){
		const list = this.props.recommendations;
		const styleContainerRecommendations = classnames('container-columns', styles.container);
		const styleContainerCol3 = classnames('container-rows', styles.col3);
		return(
				<>
				<div className={styleContainerCol3}>
					<div className={styleContainerRecommendations}>
						{this.renderSwitch(list)}
					</div>
					{this.renderToggle()}
					
				
				</div>
				
				</>
		)
	}
	
}