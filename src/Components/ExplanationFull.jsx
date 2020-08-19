import React, {Component} from 'react';
import '../Styling/global.css';
import styles from '../Styling/ExplanationFull.module.css';
import classnames from 'classnames';
import ExplanationSeed from "./ExplanationSeed";
import ExplanationFeatures from "./ExplanationFeatures";
import Album from './Album'

export default class ExplanationFull extends Component{
	render(){
		const styleContainer=classnames('container-rows', styles.containerAll);
		const styleContainerRow1=classnames('container-columns', styles.containerRow1);
		const styleContainerRow2=classnames('container-columns', styles.containerRow2);
		const styleContainerAlbum=classnames(styles.album);
		return (
			<div className={styleContainer}>
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
					/>
				</div>
				<div className={styleContainerRow2}>
					<ExplanationSeed
						key={"exp_seed_" + this.props.id}
						seedId={this.props.seedId}
						seedTitle={this.props.seedTitle}
						seedArtist={this.props.seedArtist}
						seedAlbum={this.props.seedAlbum}
						seedPreview_url={this.props.seedPreview_url}
					
					/>
				</div>
				
			</div>
		)
	}
}

