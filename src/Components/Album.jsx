import React, { Component } from 'react';
import styles from '../Styling/Album.module.css';
import play from '../Images/play.svg'
import pause from '../Images/pause.svg'

import classnames from 'classnames'


import '../Styling/global.css'

export default class Album extends Component{
	constructor(props){
		super(props);
		this.handlePlay = this.handlePlay.bind(this);
		this.handlePause = this.handlePause.bind(this);
		this.renderButton = this.renderButton.bind(this)
		this.audio = new Audio(this.props.preview_url);
		this.playable = this.checkPlayable();
		this.state = {
			playing: false
		}
	}
	
	static getDerivedStateFromProps(props, state) {
		//important to change icon
		return {playing: props.playing };
	}
	
	checkPlayable(){
		return this.props.preview_url !== null
	}
	
	
	handlePlay(){
		this.props.handlerPlaySong(this.props.id, this.audio)
		this.audio.play();
		this.setState({playing: true});
		this.audio.addEventListener('ended', this.handlePause);
	}
	
	handlePause(){
		this.props.handlerPauseSong(this.props.id, this.audio)
		this.setState({playing: false});
		this.audio.pause()
	}
	
	renderPlay(){
		const styleIconRec = classnames(styles.playRec);
		const styleIconPlaylist = classnames(styles.playPlaylist);
		return(
			<img
				src={play}
				alt="Play"
				onClick={this.handlePlay}
				className={this.props.small ? styleIconPlaylist : styleIconRec }
			
			/>
		)
	}
	
	renderPause(){
		const styleIconRec = classnames(styles.playRec);
		const styleIconPlaylist = classnames(styles.playPlaylist)
		return(
			<img
				src={pause}
				alt="Pause"
				onClick={this.handlePause}
				className={this.props.small ? styleIconPlaylist : styleIconRec }
			/>
		)
	}
	
	renderButton(){
		if (this.state.playing){
			return this.renderPause()
		}
		else{
			return this.renderPlay()
		}
	}
	
	
	
	render(){
		const background = "url(" + this.props.album + ")";
		const styleCoverDiv = classnames(styles.cover, 'container-rows');
		const stylePlaylistDiv = classnames(styles.playlist, 'container-rows');
		return(
			<>
			<div
				style={{backgroundImage: background}}
				className={this.props.small ? stylePlaylistDiv : styleCoverDiv }
			>
				{this.playable ?
					(this.renderButton())
					:
					(null)
				}
				
			</div>
			</>
		)
		
	}
}