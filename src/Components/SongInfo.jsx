import React, { Component } from 'react'
import styles from '../Styling/SongInfo.module.css';
import '../Styling/global.css'
import classnames from 'classnames'
import addToPlaylist from '../Images/addToPlaylist.svg'
import addToPlaylistGreen from '../Images/addToPlaylist-green.svg'

import question from '../Images/questionmark.svg'
import questionYellow from '../Images/questionmark-yellow.svg'
import ReactTooltip from "react-tooltip";






export default class SongInfo extends Component{
	
	constructor(props){
		super(props);
		this.addToPlaylist = this.addToPlaylist.bind(this)
		this.toggleExplanation = this.toggleExplanation.bind(this)
	}
	
	
	
	addToPlaylist(){
		const songData = {
			id: this.props.id,
			uri: this.props.uri,
			title: this.props.title,
			artist: this.props.artist,
			preview_url: this.props.preview_url,
			album: this.props.album
		};
		if (this.props.search){
			this.props.handlerStopSearch();
		}
		this.props.handlerAddToPlaylist(songData);
		this.props.handlerLogging('addToPlaylist', 'click', 1);
		
		
	}
	
	renderRecInfo(){
		const styleArtist = classnames(styles.song, styles.artist);
		const styleTitle = classnames(styles.song, styles.title);
		const styleText = classnames('container-rows', styles.text);
		return(
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
		)
	}
	
	renderSearchInfo(){
		const styleArtistSearch = classnames(styles.song, styles.artistSearch);
		const styleTitleSearch = classnames(styles.song, styles.title);
		const styleTextSearch = classnames('container-rows', styles.text);
		return(
		<div className={styleTextSearch}>
			<div
				data-tip={this.props.title}
				className={styleTitleSearch}>
				{this.props.title}
			</div>
			<div
				data-tip={this.props.artist}
				className={styleArtistSearch}
			>
				by {this.props.artist}
			</div>
		
		</div>
		)
		
	}
	
	toggleExplanation(){
		this.props.toggleExplanation();
		if (this.props.explanation){
			this.props.handlerLogging('closeExplanation', 'click', 1);
		}
		else{
			this.props.handlerLogging('openExplanation', 'click', 1);
		}
		
	}
	
	
	switchBackgroundStyle(){
		const styleBackground = classnames(styles.background, 'container-columns');
		const styleBackgroundSearch = classnames(styles.backgroundSearch, 'container-columns');
		const styleBackgroundExplanation = classnames(styles.backgroundExplanation, 'container-columns');
		if (this.props.search){
			return styleBackgroundSearch
		}
		else if (this.props.explanation){
			return styleBackgroundExplanation
		}
		else{
			return styleBackground
		}
	}
	
	
	
	render(){
		
		const styleButtons = classnames('container-rows', styles.buttons);
		
		
		return(
			<>
			<div className={this.switchBackgroundStyle()}>
				{this.props.search ? this.renderSearchInfo() : this.renderRecInfo()}
				<div className={styleButtons}>
					<img
						src={this.props.search ? addToPlaylistGreen : addToPlaylist }
						alt="Add"
						data-tip="Add to playlist"
						onClick={this.addToPlaylist}
						className={styles.icon}
					
					/>
					<ReactTooltip/>
					{this.props.search ? (null) : (
						<>
						<img
							src={this.props.explanation? questionYellow : question}
							data-tip="Why is this song recommended"
							alt="Why"
							onClick={this.toggleExplanation}
						/>
						<ReactTooltip/>
						</>
					)}
					
				</div>
				
			</div>
			</>
			)
		
	}
	
	
}

