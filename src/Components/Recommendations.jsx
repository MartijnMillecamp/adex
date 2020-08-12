import React, {Component} from 'react'
import Recommendation from "./Recommendation";
import styles from '../Styling/Recommendations.module.css';
import classnames from 'classnames'


export default class Recommendations extends Component {
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
	
	renderEmpty(){
		return (
			<>
			<p>Sorry, we could not find good recommendations</p>
			<br/>
			<p>Please consider to change source songs or your preferred audio features</p>
			</>
		)
	}
	
	render(){
		const list = this.props.recommendations;
		const styleContainerRecommendations = classnames('container-columns', styles.container);
		console.log(list)
		const empty = list.length === 0;
		return(
				<>
					<div className={styleContainerRecommendations}>
						{empty ? this.renderEmpty() : this.renderList(list)}
					</div>
				</>
		)
	}
	
}