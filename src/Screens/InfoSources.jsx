import React, {Component} from 'react';
import '../Styling/global.css'
import addToPlaylist from '../Images/addToPlaylist-green.svg'
import addSource from '../Images/source-grey.svg'
import playlistSong from '../Images/playlistSong.svg'


import classnames from 'classnames'
import styles from '../Styling/InfoSources.module.css';

import {addInteraction} from "../Utils/API";



export default class InfoSources extends Component{
	constructor(props){
		super(props)
		this.clickButton = this.clickButton.bind(this)
	}
	
	clickButton(){
		const userId = localStorage.getItem('userId');
		const openness = localStorage.getItem('openness');
		const versionUI = localStorage.getItem('version');
		addInteraction(userId, openness, versionUI, 'InfoSources', 'click', 1);
		this.props.history.push({
			pathname: '/Login',
		})
	}
	
	render(){
		const styleIcon = classnames(styles.icon);
		const styleImage = classnames(styles.image);
		const styleTextContainer = classnames('container-rows', styles.textContainer);
		const styleButton = classnames(styles.button);
		const styleContainerCenter = classnames('container-rows', styles.containerCenter);
		const styleContainer = classnames('container-rows', styles.container);
		return(
			<>
			<div
				className={styleContainer}
			>
				<div
					className={styleTextContainer}
				>
					<h2>Instructions (4)</h2>
					<p>
						When you like a recommendation,
						you can add that recommendation to your playlist
						by clicking on <img src={addToPlaylist} className={styleIcon}/>.
						Once you have done this, it will be added to your playlist as shown below.
					</p>
					<img src={playlistSong} className={styleImage}/>
					<p>
						When you want recommendations based on a song in your playlist,
						you need to click on <img src={addSource} className={styleIcon}/>.
						If you want recommendations based on multiple songs,
						you will need to wait longer than if you only have one source.
					</p>
				
				</div>
			
			
			</div>
			<button
				className={styleButton}
				onClick={this.clickButton}
			>Continue</button>
			
			</>
		
		
		)
	}
}

