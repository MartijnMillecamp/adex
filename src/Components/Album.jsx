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
	
	
	handlePlay(){
		this.props.handlerPlaySong(this.props.id, this.props.preview)
		this.audio.play()
		this.setState({playing: true});
		this.audio.addEventListener('ended', this.handlePause);
	}
	
	handlePause(){
		this.setState({playing: false});
		this.audio.pause()
		this.props.handlerPauseSong(this.props.id, this.props.preview)
	}
	
	
	
	render(){
		const background = "url(" + this.props.album + ")";
		const styleCoverDiv = classnames(styles.cover, 'container-rows');
		return(
			<>
			<div
				style={{backgroundImage: background}}
				className={styleCoverDiv}
			>
				{this.state.playing ?
					(<img
						src={pause}
						alt="Pause"
						data-tip="Pause preview"
						onClick={this.handlePause}
					/>)
					
					: (<img
						src={play}
						alt="Play"
						data-tip="Play preview"
						onClick={this.handlePlay}
					/>)
				}
				
			</div>
			</>
		)
		
	}
}