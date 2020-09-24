import React, { Component} from 'react'
import '../Styling/global.css';
import * as Survey from "survey-react";
import {addFinal} from "../Utils/API";
import {addInteraction} from '../Utils/API'



export default class Final extends Component{
	constructor(props){
		super(props);
		
		this.goToNext = this.goToNext.bind(this);
	}
	
	
	goToNext(survey){
		const data = survey.data;
		const userId = localStorage.getItem('userId');
		const nfc = localStorage.getItem('nfc');
		addFinal(userId, nfc, data);
		addInteraction(userId, nfc, -1, 'goToThanks', 'click', 1);
		this.props.history.push({
			pathname: '/Thanks',
		})
		
		
	}
	
	
	render(){
		const surveyJSON = {"pages":[{"name":"page1","elements":[
			{"type":"radiogroup","name":"question1","title":"I prefer to see the explanations....","isRequired":true,"choices":[{"value":"individual","text":"One by one"},{"value":"overview","text":"In an overview"},{"value":"not","text":"I do not need them"}],"hasOther":true},
			{"type":"text","name":"question2","title":"Why do you prefer to see the explanations one by one/in an overview/not at all?"},
			{"type":"text","name":"question3","title":"Which elements would you improve?"}]}]}
		
		
		return(
			<Survey.Survey json={ surveyJSON } onComplete={ this.goToNext } />
		);
	}
}



