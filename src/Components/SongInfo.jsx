import React, { Component } from 'react'
import styles from '../Styling/SongInfo.module.css';
import '../Styling/global.css'
import classnames from 'classnames'
import addToPlaylist from '../Images/addToPlaylist.svg'
import question from '../Images/questionmark.svg'
import ReactTooltip from "react-tooltip";






export default class SongInfo extends Component{
	
	constructor(props){
		super(props)
		this.state = {
			hoverTitle: false,
			hoverArtist: false
		};
		
		this.hoverArtist = this.hoverArtist.bind(this);
		this.hoverTitle = this.hoverTitle.bind(this);
	}
	
	hoverTitle() {
		this.setState({hoverTitle: true, hoverArtist: false});
	}
	
	hoverArtist(){
		this.setState({hoverTitle: false, hoverArtist: true});
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
					/>
					<ReactTooltip/>
					<img
						src={question}
						data-tip="Why is this song recommended"
						alt="Why" />
				</div>
				<ReactTooltip/>
				
			</div>
			</>
			)
		
	}
	
	
}

