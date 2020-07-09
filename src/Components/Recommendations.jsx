import react, {Component} from 'react'
import axios from 'axios'

export default class Recommendations extends Component {
	
	
	getRecommendations() {
		const recommendationLink = [
			"https://api.spotify.com/v1/recommendations",
			`?authorization=${this.getAccessToken()}`,
			`&seed_artists=4NHQUGzhtTLFvgF5SZesLK`,
			`&seed_tracks=0c6xIDDpzE81m2q797ordA`,
			"&min_energy=0.4",
			"&min_energy=0.4"
		].join('');
		
		const AuthStr = 'Bearer ' + this.getAccessToken();
		
		axios.get(recommendationLink, { 'headers': { 'Authorization': AuthStr } })
			.then(res => {
					const persons = res.data;
					console.log(persons)
				}
			)
	}
	
	render(){
		return <h1>recommender</h1>
	}
	
}