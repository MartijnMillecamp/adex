import React, { Component} from 'react'
import '../Styling/global.css';
import classnames from 'classnames';
import styles from '../Styling/MS.module.css'
import * as Survey from "survey-react";
import {addUser} from "../Utils/API";
import {addInteraction} from "../Utils/API";




export default class MS extends Component{
	constructor(props){
		super(props)
		this.calculateMS = this.calculateMS.bind(this)
	}
	
	
	
	setVersion(userId){
		if (userId % 4 === 0){
			localStorage.setItem('task', 1);
			localStorage.setItem('version', 1)
		}
		else if (userId % 4 === 1){
			localStorage.setItem('task', 2);
			localStorage.setItem('version', 1)
		}
		else if (userId % 4 === 2){
			localStorage.setItem('task', 1);
			localStorage.setItem('version', 2)
		}
		else if (userId % 4 === 3){
			localStorage.setItem('task', 2);
			localStorage.setItem('version', 2)
		}
		else{
			localStorage.setItem('task', 2);
			localStorage.setItem('version', 2)
		}
		localStorage.setItem('nbTested', 0)
	}
	
	calculateMS(survey){
		const data = survey.data;
		let nbQuestions = 18;
		let ms = 0;
		let reversed = [7,9,11,13,14];
		for (let i = 1; i < nbQuestions +1; i++){
			let rawScore = parseInt(data['question' + i]);
			if (reversed.indexOf(i) !== -1 ){
				ms += (8 - rawScore)
			}
			else{
				ms += (rawScore)
			}
		}
		localStorage.setItem('ms', ms );
		
		const userId = localStorage.getItem('userId');
		let gender = survey.data['question19'];
		let age = survey.data['question20'];
		let attentionms = survey.data['question21'];
		let nfc = localStorage.getItem('nfc');
		let attentionnfc = localStorage.getItem('attentionnfc');
		
		addUser(userId, ms, nfc, gender, age, attentionnfc, attentionms);
		
		this.setVersion(userId);
		
		addInteraction(userId, ms, 0, 'MS', 'click', 1);
		
		this.props.history.push({
			pathname: '/InfoSliders',
		})
	}
	
	
	render(){
		const styleContainer = classnames('container-rows', styles.container);
		const styleDivSurvey = classnames(styles.divSurvey);
		const surveyJSON =  {"pages":[{"name":"page1","elements":[
			{"type":"rating","name":"question1","title":"I spend a lot of my free time doing music-related activities.","isRequired":true,"rateMax":7,"minRateDescription":"Completely Disagree","maxRateDescription":"Completely Agree"},
			{"type":"rating","name":"question2","title":"I enjoy writing about music, for example on blogs and forums.","isRequired":true,"rateMax":7,"minRateDescription":"Completely disgree","maxRateDescription":"Completely agree"},
			{"type":"rating","name":"question3","title":"If somebody starts singing a song I don't know, I can usually join in.","isRequired":true,"rateMax":7,"minRateDescription":"Completely disgree","maxRateDescription":"Completely agree"},
			{"type":"rating","name":"question4","title":"I can sing or play music from memory.","isRequired":true,"rateMax":7,"minRateDescription":"Completely disgree","maxRateDescription":"Completely agree"},
			{"type":"rating","name":"question5","title":"I am able to hit the right notes when I sing along with a recording.","isRequired":true,"rateMax":7,"minRateDescription":"Completely disgree","maxRateDescription":"Completely agree"},
			{"type":"rating","name":"question6","title":"I can compare and discuss differences between two performances or" +
			" versions of the same piece of music.","isRequired":true,"rateMax":7,"minRateDescription":"Completely disgree","maxRateDescription":"Completely agree"},
			{"type":"rating","name":"question7","title":"I have never been complimented for my talents as a musical" +
			" performer.","isRequired":true,"rateMax":7,"minRateDescription":"Completely disgree","maxRateDescription":"Completely agree"},
			{"type":"rating","name":"question21","title":"If you are paying attention, please fill in 2.","isRequired":true,"rateMax":7,"minRateDescription":"Completely disgree","maxRateDescription":"Completely agree"},
			{"type":"rating","name":"question8","title":"I often read or search the internet for things related to music.","isRequired":true,"rateMax":7,"minRateDescription":"Completely disgree","maxRateDescription":"Completely agree"},
			{"type":"rating","name":"question9","title":"I am not able to sing in harmony when somebody is singing a" +
			" familiar tune. ","isRequired":true,"rateMax":7,"minRateDescription":"Completely disgree","maxRateDescription":"Completely agree"},
			{"type":"rating","name":"question10","title":"I am able to identify what is special about a given musical" +
			" piece.","isRequired":true,"rateMax":7,"minRateDescription":"Completely disgree","maxRateDescription":"Completely agree"},
			{"type":"rating","name":"question11","title":"When I sing, I have no idea whether I'm in tune or not.","isRequired":true,"rateMax":7,"minRateDescription":"Completely disgree","maxRateDescription":"Completely agree"},
			{"type":"rating","name":"question12","title":"Music is kind of an addiction for me - I couldn't live without" +
			" it.","isRequired":true,"rateMax":7,"minRateDescription":"Completely disgree","maxRateDescription":"Completely agree"},
			{"type":"rating","name":"question13","title":"I don’t like singing in public because I’m afraid that I would" +
			" sing wrong notes.","isRequired":true,"rateMax":7,"minRateDescription":"Completely disgree","maxRateDescription":"Completely agree"},
			{"type":"rating","name":"question14","title":"I would not consider myself a musician.","isRequired":true,"rateMax":7,"minRateDescription":"Completely disgree","maxRateDescription":"Completely agree"},
			{"type":"rating","name":"question15","title":"After hearing a new song two or three times, I can usually sing" +
			" it by myself.","isRequired":true,"rateMax":7,"minRateDescription":"Completely disgree","maxRateDescription":"Completely agree"},
			{"type":"dropdown","name":"question16","title":"I engaged in regular, daily practice of a musical instrument" +
			" (including voice) for ___ years.","isRequired":true,
				"choices":[
					{"value":"1","text":"0"},
					{"value":"2","text":"1"},
					{"value":"3","text":"2"},
					{"value":"4","text":"3"},
					{"value":"5","text":"4-5"},
					{"value":"6","text":"6-9"},
					{"value":"7","text":"10 or more"}
					]},
			{"type":"dropdown","name":"question17","title":"At the peak of my interest, I practiced ___ hours per day on" +
			" my primary instrument.","isRequired":true,
					"choices":[
						{"value": 1, "text": "0"},
						{"value": 2, "text": "0.5"},
						{"value": 3, "text": "1"},
						{"value": 4, "text": "1.5"},
						{"value": 5, "text": "2"},
						{"value": 6, "text": "3-4"},
						{"value": 7, "text": "5 or more"}
						]},
			{"type":"dropdown","name":"question18","title":"I can play ___ musical instruments","isRequired":true,"choices":[
				{"value": 1, "text": "0"},
				{"value": 2, "text": "1"},
				{"value": 3, "text": "2"},
				{"value": 4, "text": "3"},
				{"value": 5, "text": "4"},
				{"value": 6, "text": "5"},
				{"value": 7, "text": "6 or more"}
			]},
			{"type":"dropdown","name":"question19","title":"I identify myself as","isRequired":true,"choices":[{"value":"Female","text":"Female"},{"value":"Male","text":"Male"},{"value":"Equal","text":"Genderqueer"}]},
			{"type":"text","name":"question20","title":"How old are you","isRequired":true,"inputType":"number","min":"18","step":1}
			],
			"title":"Please circle the most appropriate category","description":"1: Completely Disagree       2: Strongly Disagree       3: Disagree       4: Neither Disagree nor Agree      5: Agree       6: Strongly Agree       7: Completely Agree"}]}
		
		return(
			<div
				className={styleContainer}
			>
				<div
					className={styleDivSurvey}
				>
					<Survey.Survey json={ surveyJSON } onComplete={ this.calculateMS } />
				</div>
			</div>
		
		);
	}
}



