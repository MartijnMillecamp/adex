import React, {Component} from 'react';
import styles from '../Styling/Export.module.css';
import '../Styling/global.css'
import classnames from 'classnames'

import ExportSong from '../Components/ExportSong'
import {addPlaylist, addSongsToPlaylist, getSpotifyId} from "../Utils/Spotify";

export default class Export extends Component{
	constructor(props){
		super(props);
		this.exportPlaylist = this.exportPlaylist.bind(this)
		this.goToPostTaskQuestionnaire = this.goToPostTaskQuestionnaire.bind(this)
	}
	
	
	
	goToPostTaskQuestionnaire(){
		this.props.history.push({
			pathname: '/PostTask',
		})
	}
	
	
	async exportPlaylist(){
		let title = prompt("Please enter the name of the playlist:", "Awesome playlist");
		const accessToken = this.props.location.state.access_token;
		const spotifyId = await getSpotifyId(accessToken);
		const playlistId = await addPlaylist(title, spotifyId, accessToken);
		let tracks = [];
		let length = this.props.location.state.playlist.length;
		for (let i=0; i<length; i++){
			let song = this.props.location.state.playlist[i];
			tracks.push(song.uri)
		}
		const created = await addSongsToPlaylist(playlistId, tracks, accessToken);
		if (created){
			this.goToPostTaskQuestionnaire();
		}
	}
	
	render(){
		const styleContainer = classnames('container-rows', styles.container);
		const styleContainerButton = classnames('container-rows', styles.containerButton);
		
		const list=this.props.location.state.playlist;
		return(
			<div
				className={styleContainer}
			>
				<h1>Your Playlist</h1>
				<div>
					{list.map(song =>
						(
							<ExportSong
								key={'export_' + song.title}
								title ={song.title}
								artist ={song.artist}
							
							/>
						)
					)}
				
				</div>
				<div
					className={styleContainerButton}
				>
					<span>Do you want to save this playlist?</span>
					<div>
						<button
							onClick={this.exportPlaylist}
						>Yes</button>
						<button
							onClick={this.goToPostTaskQuestionnaire}
						>No</button>
					</div>
				</div>
				
				
			</div>
		)
	}
}