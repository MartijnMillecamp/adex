import React, {Component, Fragment} from 'react';
import Home from './Home.jsx'
import axios from 'axios'


import {parseQueryString} from '../Utils/parseQueryString';


export default class Login extends Component {
	
	constructor(props) {
		super(props);
		this.client_id = 'ec702ad09c13419c944c88121847a2f6';
		this.redirect_uri = 'http://localhost:3000/callback';
		this.scopes = [
			'user-read-email'
		].join('%20');
		this.state = this.initToken()
	}
	
	initToken(){
		//	check if token is already in local storage
		if (this.checkValidToken()){
			return {token: this.getToken(), loggedIn: true}
		}
		else{
		//	check if this is a callback
			if(!window.location.hash.length){
				return {token: this.getToken(), loggedIn: false}
			}
			else{
				const token = this.setToken();
				return {token: token, loggedIn: true}
			}
		}
	}
	
	checkValidToken() {
		return this.getToken() !== null
	}
	
	login() {
		const authLink = [
			"https://accounts.spotify.com/authorize",
			`?client_id=${this.client_id}`,
			`&redirect_uri=${this.redirect_uri}`,
			`&scope=${this.scopes}`,
			"&response_type=token",
			"&show_dialog=true"
		].join('');
		window.location = authLink;
	}
	
	
	loginBtnClick(elo) {
		elo.preventDefault();
		this.login();
	}
	
	
	getToken() {
		//Check localstorage to find the token
		const tokenObj = JSON.parse(localStorage.getItem('spotify_token'));
		if(tokenObj && tokenObj.access_token && (new Date() < new Date(tokenObj.expires))) {
			return tokenObj;
		}
		else{
			return null
		}
	}
	
	setToken() {
		if(!window.location.hash.length) return;
		
		const hashObj = parseQueryString(window.location.hash);
		const tokenString = JSON.stringify({
			access_token: hashObj.access_token,
			expires: new Date(Date.now() + (hashObj.expires_in * 1000))
		})
		
		localStorage.setItem('spotify_token', tokenString );
		
		window.location.hash = '';
		return tokenString
		
	}
	
	
	
	render(){
		// fragment https://reactjs.org/docs/fragments.html
		return(
			<Fragment>
				{
					this.state.loggedIn
						? (
							<Home/>
						)
						: (
							<button className="btn btn-md btn-violet" onClick={this.loginBtnClick.bind(this)}>Log in with Spotify</button>
						)
				}
			</Fragment>
		)
	}
	
	
	
	
	
}