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
		this.audio = new Audio(this.props.preview);
		this.state = {
			playing: false
		}
	}
	
	static getDerivedStateFromProps(props, state) {
		return {playing: props.playing };
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
	
	
	
	render(){
		const background = "url(" + this.props.album + ")";
		const styleCoverDiv = classnames(styles.cover, 'container-rows');
		const stylePlaylistDiv = classnames(styles.playlist, 'container-rows');
		const styleIconRec = classnames(styles.playRec);
		const styleIconPlaylist = classnames(styles.playPlaylist)
		return(
			<>
			<div
				style={{backgroundImage: background}}
				className={this.props.playlist ? stylePlaylistDiv : styleCoverDiv }
			>
				{this.state.playing ?
					(<img
						src={pause}
						alt="Pause"
						onClick={this.handlePause}
						className={this.props.playlist ? styleIconPlaylist : styleIconRec }
					
					/>)
					
					: (<img
						src={play}
						alt="Play"
						onClick={this.handlePlay}
						className={this.props.playlist ? styleIconPlaylist : styleIconRec }
					
					/>)
				}
				
			</div>
			</>
		)
		
	}
}