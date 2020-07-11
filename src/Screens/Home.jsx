import React, {Component} from 'react'
import Recommendations from '../Components/Recommendations'

export default class Home extends Component {
	
	constructor(props){
		super(props);
		this.state = {
			recommendations: []
		};
		this.handlerRecommendations = this.handlerRecommendations.bind(this);
		
	}
	
	handlerRecommendations(recommendations) {
		this.setState({
			recommendations: recommendations
		});
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
				recommendations = {this.state.recommendations}
				tokenObject = {this.props.tokenObject}
			/>
			</>
		)
	}
	
	
}