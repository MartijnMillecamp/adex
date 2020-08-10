import React, {Component} from 'react'
import axios from 'axios'

import PlaylistSong from './PlaylistSong'
import styles from '../Styling/Playlist.module.css';
import '../Styling/global.css'

import classnames from 'classnames'


export default class Playlist extends Component{
	
	constructor(props){
		super(props);
		this.addToPlaylist = this.addToPlaylist.bind(this)
	}
	
	componentDidMount(){
		this.getTopSongs()
	}
	
	getTopSongs() {
		const accessToken = this.props.tokenObject['access_token'];
		const topLink = [
			"https://api.spotify.com/v1/me/top/tracks"
		].join('');
		
		const AuthStr = 'Bearer ' + accessToken;
		
		axios.get(topLink, { 'headers': { 'Authorization': AuthStr } })
			.then(res => {
					const resData = res.data;
					const topSongs = resData.items;
					let added = 0;
					let index = 0;
					while (added < 3 || index === 20){
						if (topSongs[index]['preview_url'] !== null){
							this.addToPlaylist(topSongs[index]);
							added += 1
						}
						index += 1;
					}
				}
			)
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