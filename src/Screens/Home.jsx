import React, {Component} from 'react'
import Recommendations from '../Components/Recommendations'
import 'fontsource-roboto';
import {addToDict} from '../Utils/addToDict';
import {removeFromArrayOfObjects} from '../Utils/removeFromArray';
import Playlist from "../Components/Playlist";
import classnames from 'classnames'
import '../Styling/global.css'


export default class Home extends Component {
	
	constructor(props){
		super(props);
		this.state = {
			recommendations: [],
			playing: null,
			audioList: {},
			playlist: [],
			sources: [],
		};
		this.handlerRecommendations = this.handlerRecommendations.bind(this);
		this.handlerPlaySong = this.handlerPlaySong.bind(this);
		this.handlerPauseSong = this.handlerPauseSong.bind(this);
		this.handlerAddToPlaylist = this.handlerAddToPlaylist.bind(this);
		this.handlerDeleteFromPlaylist = this.handlerDeleteFromPlaylist.bind(this);
		this.handlerAddSource = this.handlerAddSource.bind(this);
		this.handlerRemoveSource = this.handlerRemoveSource.bind(this)
		
	}
	
	handlerAddSource(song){
		this.setState({
			sources: [...this.state.sources, song]
		});
		console.log(this.state.sources)
	}
	
	handlerRemoveSource(song){
		const sources = removeFromArrayOfObjects(this.state.sources, 'id', song);
		console.log(sources, song.id)
		this.setState({
			sources: sources
		});
		console.log(this.state.sources)
	}
	
	handlerRecommendations(recommendations) {
		this.setState({
			recommendations: recommendations
		});
	}
	
	handlerAddToPlaylist(song){
		const recommendations = removeFromArrayOfObjects(this.state.recommendations, 'id', song)
		
		this.setState({
			playlist: [...this.state.playlist, song],
			recommendations: recommendations
		})
		//stop playing if added to playlist
		if (this.state.playing === song.id){
			this.stopPlayingSong()
			this.setState({
				playing: null
			})
		}
	}
	
	handlerDeleteFromPlaylist(song){
		const playlist = removeFromArrayOfObjects(this.state.playlist, 'id', song);
		this.setState({
			playlist: playlist
		});
		//stop playing if removed
		if (this.state.playing === song.id){
			this.stopPlayingSong()
			this.setState({
				playing: null
			})
		}
	}
	
	handlerPlaySong(id, audio){
		this.stopPlayingSong();
		this.setState({
			playing: id
		});
		const newAudioList = addToDict(this.state.audioList, id, audio);
		this.setState({
			audioList: newAudioList
		})
	//	TODO delete list of audio when updating recommendations

	}
	
	stopPlayingSong(){
		if (this.state.playing !== null){
			const playingAudio = this.state.audioList[this.state.playing];
			playingAudio.pause()
		}
	}
	
	handlerPauseSong(id, preview){
		this.setState({
			playing: null
		});
	}
	
	getAccessToken(){
		const tokenObj = JSON.parse(localStorage.getItem('spotify_token'));
		if(tokenObj
			&& tokenObj.access_token
			&& (new Date() < new Date(tokenObj.expires))
		) {
			return tokenObj.access_token;
		}
		else return null;
	}
	
	render() {
		const styleContainerHome = classnames('container-columns');
		return (
			<div className={styleContainerHome}>
			
				<Playlist
					handlerPlaySong = {this.handlerPlaySong}
					handlerPauseSong = {this.handlerPauseSong}
					playlist = {this.state.playlist}
					tokenObject = {this.props.tokenObject}
					playing = {this.state.playing}
					handlerDeleteFromPlaylist = {this.handlerDeleteFromPlaylist}
					handlerAddSource = {this.handlerAddSource}
					handlerRemoveSource = {this.handlerRemoveSource}
				/>
				
				<Recommendations
					updateRecommendations = {this.handlerRecommendations}
					handlerPlaySong = {this.handlerPlaySong}
					handlerPauseSong = {this.handlerPauseSong}
					recommendations = {this.state.recommendations}
					tokenObject = {this.props.tokenObject}
					playing = {this.state.playing}
					handlerPlaylist = {this.handlerAddToPlaylist}
				/>
			</div>
		)
	}
	
	
}