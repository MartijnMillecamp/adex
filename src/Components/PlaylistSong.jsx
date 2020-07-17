import React, {Component} from 'react';

import styles from '../Styling/PlaylistSong.module.css';
import '../Styling/global.css'
import classnames from 'classnames'
import ReactTooltip from "react-tooltip";

import deleteFromPlaylist from '../Images/delete.svg'
import source from '../Images/source.svg'
import sourceGrey from '../Images/source-grey.svg'


import Album from "./Album";






export default class PlaylistSong extends Component{
	constructor(props){
		super(props);
		this.deleteFromPlaylist = this.deleteFromPlaylist.bind(this);
		this.handlerAddSource = this.handlerAddSource.bind(this);
		this.handlerRemoveSource = this.handlerRemoveSource.bind(this);
		this.state = {
			source: true
		};
	}
	
	componentDidMount(){
		this.handlerAddSource()
	}
	
	deleteFromPlaylist(){
		this.props.handlerDeleteFromPlaylist({id: this.props.id})
	}
	
	
	
	handlerAddSource(){
		this.setState({
			source: true
		});
		const songData = {id: this.props.id}
		this.props.handlerAddSource(songData)
	}
	
	handlerRemoveSource(){
		this.setState({
			source: false
		});
		this.props.handlerRemoveSource({id: this.props.id})
	}
	
	render(){
		const styleArtist = classnames(styles.song, styles.artist);
		const styleTitle = classnames(styles.song, styles.title);
		const styleBackground = classnames(styles.background, 'container-columns');
		const styleText = classnames('container-rows', styles.text);
		const styleButtons = classnames('container-rows', styles.buttons);
		const styleDelete = classnames(styles.deleteSong);
		const styleIcon = classnames(styles.icon);
		
		const styleContainer = classnames('container-columns', styles.container)
		
		return(
			<>
			<div
				className={styleContainer}
			>
				<Album
					key={"album_" + this.props.id}
					id={this.props.id}
					album={this.props.album}
					preview={this.props.preview}
					handlerPlaySong = {this.props.handlerPlaySong}
					handlerPauseSong = {this.props.handlerPauseSong}
					playing = {this.props.playing}
					playlist = {true}
				/>
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
							className={styleDelete}
							src={deleteFromPlaylist}
							alt="Delete"
							data-tip="Delete from playlist"
							onClick={this.deleteFromPlaylist}
						/>
						<ReactTooltip/>
						{this.state.source ?
							(<img
								src={source}
								alt="Input"
								onClick={this.handlerRemoveSource}
								className={styleIcon}
							/>)
							
							: (<img
								src={sourceGrey}
								alt="Input"
								onClick={this.handlerAddSource}
								className={styleIcon}
							/>)
						}
					</div>
				</div>
				
			</div>
			
			
			</>
		)
		
	}
	
	
}