import React, {Component} from 'react'
import PlaylistSong from './PlaylistSong'
import styles from '../Styling/Playlist.module.css';
import classnames from 'classnames'


export default class Playlist extends Component{
	constructor(props){
		super(props)
		// this.state({
		// 	playlist: []
		// })
	}
	
	checkPlaying(id){
		return this.props.playing === id
	}
	
	render(){
		const list = this.props.playlist;
		const styleContainerPlaylist = classnames('container-rows', styles.container);
		const styleHeader = classnames(styles.header);
		return(
			<div className={styleContainerPlaylist}>
				<h1 className={styleHeader}> Your Playlist </h1>
				<div>
					{list.map(song =>
						(
							<PlaylistSong
								key={"playlist_" + song.id}
								id={song.id}
								title={song.title}
								artist={song.artist}
								preview={song.preview}
								album={song.album}
								handlerPlaySong = {this.props.handlerPlaySong}
								handlerPauseSong = {this.props.handlerPauseSong}
								playing = {this.checkPlaying(song.id)}
								handlerDeleteFromPlaylist = {this.props.handlerDeleteFromPlaylist}
								handlerAddSource = {this.props.handlerAddSource}
								handlerRemoveSource = {this.props.handlerRemoveSource}
							/>
						)
					)}
				</div>
				
			</div>
		)
	}
}