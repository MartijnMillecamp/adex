import React, {Component} from 'react'
import Album from './Album'
import ExplanationAll from './ExplanationAll'
import ExplanationFeatures from './ExplanationFeatures'
import classnames from 'classnames'
import styles from "../Styling/ExplanationOpenness.module.css"

export default class ExplanationOpenness extends Component{
	
	render(){
		const styleContainerAll = classnames('container-columns', styles.containerAll);
		const styleContainerRow1=classnames('container-columns', styles.containerRow1);
		const styleContainerRow2=classnames('container-columns', styles.containerRow2);
		const styleContainerAlbum=classnames(styles.album);
		if (this.props.version === 1){
			//high openness
			return(
				<ExplanationAll
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
					version={this.props.version}
					
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
		else{
			//low openness
			return(
				<div className={styleContainerAll}>
					<div className={styleContainerRow1}>
						<div
							className={styleContainerAlbum}
						>
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
						</div>
						
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
					</div>
				</div>
				
				
				)
		}
	}
}