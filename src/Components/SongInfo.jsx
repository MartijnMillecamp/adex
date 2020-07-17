import React, { Component } from 'react'
import styles from '../Styling/SongInfo.module.css';
import '../Styling/global.css'
import classnames from 'classnames'
import addToPlaylist from '../Images/addToPlaylist.svg'
import question from '../Images/questionmark.svg'
import ReactTooltip from "react-tooltip";






export default class SongInfo extends Component{
	
	constructor(props){
		super(props);
		this.addToPlaylist = this.addToPlaylist.bind(this)
	}
	
	
	
	addToPlaylist(){
		const songData = {
			id: this.props.id,
			title: this.props.title,
			artist: this.props.artist,
			preview: this.props.preview,
			album: this.props.album
		};
		this.props.handlerPlaylist(songData)
	}
	
	
	
	
	
	
	
	render(){
		const styleArtist = classnames(styles.song, styles.artist);
		const styleTitle = classnames(styles.song, styles.title);
		const styleBackground = classnames(styles.background, 'container-columns');
		const styleText = classnames('container-rows', styles.text);
		const styleButtons = classnames('container-rows', styles.buttons);
		
		return(
			<>
			<div className={styleBackground}>
				<div className={styleText}>
					<div
						data-tip={this.props.title}
						className={styleTitle}>
						{this.props.title}
					</div>
					<ReactTooltip/>
					<div
						data-tip={this.props.artist}
						className={styleArtist}
					>
						by {this.props.artist}
					</div>
					<ReactTooltip/>
				
				</div>
				<div className={styleButtons}>
					<img
						src={addToPlaylist}
						alt="Add"
						data-tip="Add to playlist"
						onClick={this.addToPlaylist}
					
					/>
					<ReactTooltip/>
					<img
						src={question}
						data-tip="Why is this song recommended"
						alt="Why" />
					<ReactTooltip/>
				</div>
				
			</div>
			</>
			)
		
	}
	
	
}

