import React, {Component} from 'react'
import axios from 'axios'
import Recommendation from "./Recommendation";
import styles from '../Styling/Recommendations.module.css';
import classnames from 'classnames'


export default class Recommendations extends Component {
	constructor(props){
		super(props)
	}
	
	componentDidMount(){
		this.getRecommendations()
	}
	
	filterNoPreview(recommendations){
		const newList = [];
		const length = recommendations.length;
		for (let i = 0; i < length; i++){
			let rec = recommendations[i]
			if (rec.preview_url !== null){
				newList.push(rec)
			}
		}
		return newList
	}
	
	
	
	getRecommendations() {
		const accessToken = this.props.tokenObject['access_token'];
		const recommendationLink = [
			"https://api.spotify.com/v1/recommendations",
			`?authorization=${accessToken}`,
			`&seed_artists=4NHQUGzhtTLFvgF5SZesLK`,
			`&seed_tracks=0c6xIDDpzE81m2q797ordA`,
			"&min_energy=0.4",
			"&min_energy=0.4"
		].join('');
		
		const AuthStr = 'Bearer ' + accessToken;
		
		axios.get(recommendationLink, { 'headers': { 'Authorization': AuthStr } })
			.then(res => {
					const resData = res.data;
					const recommendations = resData['tracks'];
					const recFiltered = this.filterNoPreview(recommendations)
					this.props.updateRecommendations(recFiltered)
				}
			)
	}
	
	
	render(){
		const list = this.props.recommendations;
		// if (list.length > 0){
		// 	console.log(list[0].id)
		// }
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
								/>
							)
						)}
					</div>
				</>
		)
	}
	
}