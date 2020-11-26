import React, {Component} from 'react';
import '../Styling/global.css';
import styles from '../Styling/ExplanationAll.module.css';
import classnames from 'classnames';
import RadialProgress from "./RadialProgress"
import ExplanationSeed from "./ExplanationSeed";
import ExplanationFeatures from "./ExplanationFeatures";
import Album from './Album'

export default class ExplanationAll extends Component{
	constructor(props){
		super(props);
		this.state={
			fit: this.calculateFit(),
		};
		this.calculateFit = this.calculateFit.bind(this);
	}
	
	calculateFit(){
		const sliderValuesDict = this.props.sliderValueDict;
		const diffDanceability = Math.abs(parseFloat(this.props.danceability) - sliderValuesDict['danceability']) * 100;
		const diffEnergy = Math.abs(parseFloat(this.props.energy) - sliderValuesDict['energy']) * 100;
		const diffHappiness = Math.abs(parseFloat(this.props.happiness) - sliderValuesDict['happiness']) * 100;
		const diffPopularity = Math.abs(parseFloat(this.props.popularity) - sliderValuesDict['popularity']);
		const diff = diffDanceability + diffEnergy + diffHappiness + diffPopularity;
		return Math.round(10* (100.0 - (diff / 4))) / 10
	}
	
	renderExplanationAll(){
		const styleContainerAll = classnames('container-columns', styles.containerAll);
		const styleContainerColumn1 = classnames('container-rows', styles.containerColumn1);
		const styleContainerColumn2 = classnames('container-rows', styles.containerColumn2);
		const styleTextSeed = classnames(styles.textSeed);
		
		return (
			<>
			<div className={styleContainerAll}>
				<div className={styleContainerColumn1}>
					<Album
						key={"album_exp" + this.props.id}
						id={this.props.id}
						album={this.props.album}
						preview_url={this.props.preview_url}
						handlerPlaySong = {this.props.handlerPlaySong}
						handlerPauseSong = {this.props.handlerPauseSong}
						playing = {this.props.playing}
						size = {'explSeed'}
						playable = {true}
						handlerLogging={this.props.handlerLogging}
					/>
					<RadialProgress
						fit={this.state.fit}
					/>
					<Album
						key={"album_exp_seed_" + this.props.id}
						id={this.props.seedId}
						album={this.props.seedAlbum}
						preview_url={null}
						size = {'explSeed'}
						playable = {false}
					/>
					
				</div>
				<div className={styleContainerColumn2}>
					<ExplanationFeatures
						key={"exp_features" + this.props.id}
						danceability={this.props.danceability}
						energy={this.props.energy}
						happiness={this.props.happiness}
						popularity={this.props.popularity}
						sliderValueDict={this.props.sliderValueDict}
						colorDict={this.props.colorDict}
						iconDict={this.props.iconDict}
						tooltip={true}
					/>
					<div
						className={styleTextSeed}
					>
						Recommended because:
						<br/>
						1) it is a <b> {this.state.fit} % fit </b>
						<br/>
						2) it is similar to <b>{this.props.seedTitle}</b>
					</div>
				</div>
			</div>
			
			</>
		
		)
	}
	
	
	render(){
		const styleContainer=classnames('container-rows', styles.containerAll);
		
		return (
			<div className={styleContainer}>
				{this.renderExplanationAll() }
			
			</div>
		)
	}
}

