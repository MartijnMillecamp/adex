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
	
	render(){
		const list = this.props.recommendations;
		const styleContainerRecommendations = classnames('container-columns', styles.container);
		return(
				<>
					<div className={styleContainerRecommendations}>
						{list.map(rec =>
							(
								<Recommendation
									key={"rec_" + rec.id}
									id={rec.id}
									title={rec.name}
									artist={rec.artists[0]['name']}
									album={rec.album.images[1].url}
									preview={rec.preview_url}
									handlerPlaySong = {this.props.handlerPlaySong}
									handlerPauseSong = {this.props.handlerPauseSong}
									playing = {this.checkPlaying(rec.id)}
									handlerPlaylist = {this.props.handlerPlaylist}
								/>
							)
						)}
					</div>
				</>
		)
	}
	
}