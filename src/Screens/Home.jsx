import React, {Component} from 'react'
import axios from 'axios'

export default class Home extends Component {
	
	getDataSpotify() {
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
	
	getAccessToken(){
		const tokenObj = JSON.parse(localStorage.getItem('spotify_token'));
		if(tokenObj
			&& tokenObj.access_token
			&& (new Date() < new Date(tokenObj.expires))
		) {
			// return tokenObj.access_token;
			return null
		}
		else return null;
	}
	
	render() {
		const token = this.getAccessToken();
		this.getDataSpotify()
		return (
			<h1>{token}</h1>
		)
	}
	
	
}