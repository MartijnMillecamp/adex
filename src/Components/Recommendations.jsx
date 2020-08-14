import React, {Component} from 'react'
import Recommendation from "./Recommendation";
import styles from '../Styling/Recommendations.module.css';
import classnames from 'classnames'
import spinner from '../Images/spinner.gif'


export default class Recommendations extends Component {
	//todo error message when no rec anymore vs updating
	constructor(props){
		super(props)
	}
	
	checkPlaying(id){
		return this.props.playing === id
	}
	
	
	renderList(list){
		return (
			list.map(rec =>
				(
					<Recommendation
						key={"rec_" + rec.id}
						id={rec.id}
						title={rec.name}
						artist={rec.artists[0]['name']}
						album={rec.album.images[1].url}
						preview_url={rec.preview_url}
						handlerPlaySong = {this.props.handlerPlaySong}
						handlerPauseSong = {this.props.handlerPauseSong}
						playing = {this.checkPlaying(rec.id)}
						handlerAddToPlaylist = {this.props.handlerAddToPlaylist}
					/>
				)
			)
		)
	}
	
	renderUpdate(){
		const spinnerStyle =classnames(styles.spinner)
		return (
			<>
			<img
				src={spinner}
				alt="loading..."
				key="spinner"
				className={spinnerStyle}
			/>
			</>
		)
	}
	
	renderEmpty(){
		const styleEmpty = classnames(styles.empty)
		return (
			<span
				className={styleEmpty}
			>
				Sorry, we could not find good recommendations.
				Please change your features or add a new song as source in your playlist.
			</span>
		)
	}
	
	renderSwitch(list){
		if (this.props.status === 'empty'){
			return this.renderEmpty()
		}
		else if (this.props.status === 'updating'){
			return this.renderUpdate()
		}
		else if (this.props.status === 'finished'){
			return this.renderList(list)
		}
		else{
			this.renderList(list)
		}
	}
	
	render(){
		const list = this.props.recommendations;
		const styleContainerRecommendations = classnames('container-columns', styles.container);
		return(
				<>
					<div className={styleContainerRecommendations}>
						{this.renderSwitch(list)}
						
					
					</div>
				</>
		)
	}
	
}