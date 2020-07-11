import React, {Component} from 'react'
import axios from 'axios'
import Recommendation from "./Recommendation";

export default class Recommendations extends Component {
	
	componentDidMount(){
		this.getRecommendations()
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
					console.log(recommendations)
					this.props.updateRecommendations(recommendations)
				}
			)
	}
	
	render(){
		const list = this.props.recommendations;
		return(
			<>
			<h1>recommendations</h1>
			<p>{list.length}</p>
			<div>
				{list.map(rec => (
					<Recommendation key={rec.id} title={rec.name} artist={rec.artists[0]['name']}/>
				))}
			</div>
			</>
		)
	}
	
}