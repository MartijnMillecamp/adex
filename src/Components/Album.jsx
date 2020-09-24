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
		
		this.props.handlerPlaySong(this.props.id, this.audio);
		this.audio.play();
		this.setState({playing: true});
		this.audio.addEventListener('ended', this.handlePause);
		if (this.props.size === 'recommendation'){
			this.props.handlerLogging('playRec', 'click', this.props.id);
		}
		else{
			this.props.handlerLogging('playPlaylist', 'click', this.props.id);
		}
	}
	
	handlePause(){
		this.props.handlerPauseSong(this.props.id, this.audio)
		this.setState({playing: false});
		this.audio.pause()
		if (this.props.size === 'recommendation'){
			this.props.handlerLogging('pauseRec', 'click', this.props.id);
		}
		else{
			this.props.handlerLogging('pausePlaylist', 'click', this.props.id);
		}
	}
	
	renderPlay(){
		let style = classnames(styles.playPlaylist);
		if (this.props.size === 'recommendation'){
			style = classnames(style.playRec)
		}
		return(
			<img
				src={play}
				alt="Play"
				onClick={this.handlePlay}
				className={style}
			
			/>
		)
	}
	
	renderPause(){
		let style = classnames(styles.playPlaylist);
		if (this.props.size === 'recommendation'){
			style = classnames(style.playRec)
		}
		
		return(
			<img
				src={pause}
				alt="Pause"
				onClick={this.handlePause}
				className={style }
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
	
	switchStyleDiv(){
		const styleCoverDiv = classnames(styles.cover, 'container-rows');
		const stylePlaylistDiv = classnames(styles.playlist, 'container-rows');
		const styleExplSeedDiv = classnames(styles.explSeed, 'container-rows')
		if (this.props.size === 'explSeed'){
			return styleExplSeedDiv
		}
		else if (this.props.size === 'recommendation'){
			return styleCoverDiv
		}
		else{
			return stylePlaylistDiv
		}
	}
	
	
	
	render(){
		const background = "url(" + this.props.album + ")";
		// console.log(background)
		return(
			<>
			<div
				style={{backgroundImage: background}}
				className={this.switchStyleDiv()}
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