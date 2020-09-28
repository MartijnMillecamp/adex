import React, {Component} from 'react'

import PlaylistSong from './PlaylistSong'
import styles from '../Styling/Playlist.module.css';
import '../Styling/global.css'

import classnames from 'classnames'
import {getTopSong} from "../Utils/Spotify";
import ReactTooltip from "react-tooltip";




export default class Playlist extends Component{
	//TODO show values of song?
	//TODO show profile of playlist
	constructor(props){
		super(props);
		this.addToPlaylist = this.addToPlaylist.bind(this);
		this.clickContinue = this.clickContinue.bind(this);
	}
	
	componentDidMount(){
		this.getTopSongs()
	}
	
	clickContinue(){
		this.props.handlerLogging('homeContinue', 'click', 1);
		const task = this.getTask();
		alert(task)
	}
	
	
	
	async getTopSongs() {
		let topSong = await getTopSong(this.props.accessToken, this.props.version);
		const danceability = topSong['danceability'];
		const energy = topSong['energy'];
		const happiness = topSong['valence'];
		const popularity = topSong['popularity'];
		const sliderValueDict = {
			danceability : danceability.toFixed(2),
			energy: energy.toFixed(2),
			happiness: Math.round(100 * happiness) /100,
			popularity: Math.round(popularity)
		};
		this.props.handlerInitSliderValues(sliderValueDict);
		this.addToPlaylist(topSong);
		
	}
	
	addToPlaylist(song){
		const songData = {
			id: song.id,
			uri: song.uri,
			title: song.name,
			artist: song.artists[0]['name'],
			preview_url: song.preview_url,
			album: song.album.images[0]['url']
		};
		this.props.handlerAddToPlaylist(songData)
	}
	
	checkPlaying(id){
		return this.props.playing === id
	}
	
	getTask(){
		const taskNb = localStorage.getItem('task');
		const taskDict = {
			1: "sports",
			2: "relaxing"
		};
		const situation = taskDict[taskNb];
		return "Your task is to create a playlist of 8 songs you would want to listen during a " + situation + " activity"
	}
	
	render(){
		const list = this.props.playlist;
		const styleContainer = classnames('container-rows', styles.container);
		const styleContainerPlaylist = classnames('container-rows', styles.containerPlaylist);
		const styleHeader = classnames(styles.header);
		const styleButton = classnames(styles.button);
		return(
			<div className={styleContainer}>
				<div className={styleContainerPlaylist}>
					<h1 className={styleHeader}> Your Playlist </h1>
					
					{list.map(song =>
						(
							<PlaylistSong
								key={"playlist_" + song.id}
								id={song.id}
								uri={song.uri}
								title={song.title}
								artist={song.artist}
								preview_url={song.preview_url}
								album={song.album}
								handlerPlaySong = {this.props.handlerPlaySong}
								handlerPauseSong = {this.props.handlerPauseSong}
								playing = {this.checkPlaying(song.id)}
								handlerDeleteFromPlaylist = {this.props.handlerDeleteFromPlaylist}
								handlerAddSource = {this.props.handlerAddSource}
								handlerRemoveSource = {this.props.handlerRemoveSource}
								handlerLogging = {this.props.handlerLogging}
							/>
						)
					)}
				</div>
				<button
					className={styleButton}
					onClick={this.clickContinue}
					data-tip={this.getTask()}
				>
					Continue
				</button>
				<ReactTooltip/>
				
			</div>
		)
	}
}