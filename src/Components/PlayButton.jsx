import React, { Component } from 'react';
import styles from '../Styling/PlayButton.module.css';
import '../Styling/global.css'
import play from '../Images/play.svg'
import pause from '../Images/pause.svg'

import classnames from 'classnames'

export default class PlayButton extends Component{
	constructor(props){
		super(props);
		this.handlePlay = this.handlePlay.bind(this);
		this.handlePause = this.handlePause.bind(this);
		this.audio = new Audio(this.props.preview_url);
		this.state = {
			playing: false
		}
	}
	
	
	getDerivedFromProps(props, state){
		//important to switch icons
		return {playing: this.props.playing}
	}
	
	handlePlay(){
		this.props.handlerPlaySong(this.props.id, this.audio);
		this.audio.play();
		this.setState({playing: true});
		this.audio.addEventListener('ended', this.handlePause);
	}
	
	handlePause(){
		this.props.handlerPauseSong(this.props.id, this.audio);
		this.setState({playing: false});
		this.audio.pause()
	}
	
	render(){
		console.log(this.props.playing)
		const styleIconRec = classnames(styles.playRec);
		const styleIconSmall = classnames(styles.playSmall);
		return(
			this.props.playing ?
				(<img
					src={pause}
					alt="Pause"
					onClick={this.props.handlePause}
					className={this.props.small ? styleIconSmall : styleIconRec}
				
				/>)
				
				: (<img
					src={play}
					alt="Play"
					onClick={this.props.handlePlay}
					className={this.props.small ? styleIconSmall : styleIconRec}
				/>)
			
			
		)
	}
	
	
}


