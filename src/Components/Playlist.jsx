import React, {Component} from 'react'

import PlaylistSong from './PlaylistSong'
import styles from '../Styling/Playlist.module.css';
import '../Styling/global.css'

import classnames from 'classnames'
import {getTopSong} from "../Utils/Spotify";


export default class Playlist extends Component{
	//TODO show values of song?
	//TODO show profile of playlist
	constructor(props){
		super(props);
		this.addToPlaylist = this.addToPlaylist.bind(this)
	}
	
	componentDidMount(){
		this.getTopSongs()
	}
	
	async getTopSongs() {
		//todo update slider values
		const accessToken = this.props.tokenObject['access_token'];
		let topSong = await getTopSong(accessToken);
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
	
	render(){
		const list = this.props.playlist;
		const styleContainerPlaylist = classnames('container-rows', styles.container);
		const styleHeader = classnames(styles.header);
		return(
			<div className={styleContainerPlaylist}>
				<h1 className={styleHeader}> Your Playlist </h1>
				<div>
					{list.map(song =>
						(
							<PlaylistSong
								key={"playlist_" + song.id}
								id={song.id}
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
							/>
						)
					)}
				</div>
				
			</div>
		)
	}
}