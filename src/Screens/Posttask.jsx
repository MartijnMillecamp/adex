import React, { Component} from 'react'
import '../Styling/global.css';
import styles from '../Styling/NFC.module.css';
import classnames from 'classnames';
import * as Survey from "survey-react";

import {addUser} from '../Utils/API.js'
import {addUserLocal} from "../Utils/API";



export default class Posttask extends Component{
	constructor(props){
		super(props)
		this.setVersionSecond = this.setVersionSecond.bind(this);
		this.goToNext = this.goToNext.bind(this);
	}
	
	
	
	setVersionSecond(userId){
		if (userId % 4 === 0){
			localStorage.setItem('task', 2);
			localStorage.setItem('version', 2)
		}
		else if (userId % 4 === 1){
			localStorage.setItem('task', 1);
			localStorage.setItem('version', 2)
		}
		else if (userId % 4 === 2){
			localStorage.setItem('task', 2);
			localStorage.setItem('version', 1)
		}
		else if (userId % 4 === 3){
			localStorage.setItem('task', 1);
			localStorage.setItem('version', 1)
		}
		else{
			localStorage.setItem('task', 1);
			localStorage.setItem('version', 1)
		}
		localStorage.setItem('nbTested', 1)
	}
	
	goToNext(survey){
		const data = survey.data;
		//todo store data
		const userId = localStorage.getItem('userId');
		const nbTested = localStorage.getItem('nbTested');
		console.log(nbTested);
		if (parseInt(nbTested) === 0){
			this.setVersionSecond(userId);
			this.props.history.push({
				pathname: '/Home',
			})
		}
		else{
			this.props.history.push({
				pathname: '/Final',
			})
		}
		
		
	}
	
	
	render(){
		const surveyJSON = {"pages":[{"name":"page1","elements":[
			{"type":"rating","name":"question0","title":"I will use this recommender system again","isRequired":true,"rateValues":[1,2,3,4,5]},
			{"type":"rating","name":"question1","title":"The explanations made me more confident about my playlist.","isRequired":true,"rateValues":[1,2,3,4,5]},
			{"type":"rating","name":"question2","title":"I will tell my friends about this recommender.","isRequired":true,"rateValues":[1,2,3,4,5]},
			{"type":"rating","name":"question3","title":"I am convinced of the songs recommended to me.","isRequired":true,"rateValues":[1,2,3,4,5]},
			{"type":"rating","name":"question4","title":"Overall, I am satisfied with the recommender system.","isRequired":true,"rateValues":[1,2,3,4,5]},
			{"type":"rating","name":"question5","title":"The information provided for the recommended songs is sufficient" +
			" for me to make a decision.","isRequired":true,"rateValues":[1,2,3,4,5]},
			{"type":"text","name":"question6","title":"Which was the most important audio feature to you?"}
			],
			"title":"Please fill in what you think of the recommender system you just tested"}]}
		
		return(
			<Survey.Survey json={ surveyJSON } onComplete={ this.goToNext } />
		);
	}
}



