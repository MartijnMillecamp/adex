import React, {Component} from 'react'
import axios from 'axios'

export default class Home extends Component {
	
	constructor(props){
		super(props)
		
	}
	
	getAccessToken(){
		const tokenObj = JSON.parse(localStorage.getItem('spotify_token'));
		if(tokenObj
			&& tokenObj.access_token
			&& (new Date() < new Date(tokenObj.expires))
		) {
			return tokenObj.access_token;
		}
		else return null;
	}
	
	render() {
		const token = this.getAccessToken();
		return (
			<h1>{token}</h1>
		)
	}
	
	
}