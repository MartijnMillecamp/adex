import React, {Component} from 'react'
import Recommendations from '../Components/Recommendations'
import 'fontsource-roboto';


export default class Home extends Component {
	
	constructor(props){
		super(props);
		this.state = {
			recommendations: [],
			playing: null
		};
		this.handlerRecommendations = this.handlerRecommendations.bind(this);
		this.handlerPlaySong = this.handlerPlaySong.bind(this);
		this.handlerPauseSong = this.handlerPauseSong.bind(this);
		
	}
	
	handlerRecommendations(recommendations) {
		this.setState({
			recommendations: recommendations
		});
	}
	
	handlerPlaySong(id, preview){
		this.setState({
			playing: id
		});
		// TODO pause all audio
	//	TODO delete list of audio when updating recommendations
	//	TODO add audio to list

	}
	
	handlerPauseSong(id, preview){
		this.setState({
			playing: null
		});
		console.log("TODO pause all songs ")
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
		
		return (
			<>
			<Recommendations
				updateRecommendations = {this.handlerRecommendations}
				handlerPlaySong = {this.handlerPlaySong}
				handlerPauseSong = {this.handlerPauseSong}
				recommendations = {this.state.recommendations}
				tokenObject = {this.props.tokenObject}
			/>
			</>
		)
	}
	
	
}