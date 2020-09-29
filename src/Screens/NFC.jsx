import React, { Component} from 'react'
import '../Styling/global.css';
import * as Survey from "survey-react";
import {addUser} from "../Utils/API";
import {addInteraction} from "../Utils/API";




export default class NFC extends Component{
	constructor(props){
		super(props)
		this.calculateNFC = this.calculateNFC.bind(this)
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
	
	calculateNFC(survey){
		const data = survey.data;
		let nbQuestions = 18;
		let total = 0;
		let reversed = [3,4,5,7,8,9,12,16,17];
		for (let i = 1; i < nbQuestions +1; i++){
			let rawScore = parseInt(data['question' + i]);
			if (reversed.indexOf(i) !== -1 ){
				total += (5 - rawScore)
			}
			else{
				total += (rawScore -1)
			}
		}
		localStorage.setItem('nfc', total );
		
		const userId = localStorage.getItem('userId');
		let gender = survey.data['question19'];
		let age = survey.data['question20'];
		addUser(userId, total, gender, age);
		
		this.setVersion(userId);
		
		addInteraction(userId, total, 0, 'NFC', 'click', 1);
		
		this.props.history.push({
			pathname: '/Login',
		})
	}
	
	
	render(){
		const surveyJSON = {"pages":[{"name":"page1","elements":[
			{"type":"rating","name":"question1","title":"I prefer complex to simple problems","isRequired":true,"rateValues":[1,2,3,4,5]},
			{"type":"rating","name":"question2","title":"I like to have the responsibility of handling a situation that" +
			" requires a lot of thinking.","isRequired":true,"rateValues":[1,2,3,4,5]},
			{"type":"rating","name":"question3","title":"Thinking is not my idea of fun.","isRequired":true,"rateValues":[1,2,3,4,5]},
			{"type":"rating","name":"question4","title":"I would rather do something that requires little thought than" +
			" something that is sure to challenge my thinking abilities.","isRequired":true,"rateValues":[1,2,3,4,5]},
			{"type":"rating","name":"question5","title":"I try to anticipate and avoid situations where there is a likely" +
			" chance I will have to think in depth about something.","isRequired":true,"rateValues":[1,2,3,4,5]},
			{"type":"rating","name":"question6","title":"I find satisfaction in deliberating hard and for long hours.","isRequired":true,"rateValues":[1,2,3,4,5]},
			{"type":"rating","name":"question7","title":"  I only think as hard as I have to.","isRequired":true,"rateValues":[1,2,3,4,5]},
			{"type":"rating","name":"question8","title":"I prefer to think about small daily projects to long term ones.","isRequired":true,"rateValues":[1,2,3,4,5]},
			{"type":"rating","name":"question9","title":"I like tasks that require little thought once I’ve learned them.","isRequired":true,"rateValues":[1,2,3,4,5]},
			{"type":"rating","name":"question10","title":"The idea of relying on thought to make my way to the top appeals" +
			" to me.","isRequired":true,"rateValues":[1,2,3,4,5]},
			{"type":"rating","name":"question11","title":"I really enjoy a task that involves coming up with new solutions" +
			" to problems.","isRequired":true,"rateValues":[1,2,3,4,5]},
			{"type":"rating","name":"question12","title":"Learning new ways to think doesn’t excite me very much.","isRequired":true,"rateValues":[1,2,3,4,5]},
			{"type":"rating","name":"question13","title":"I prefer my life to be filled with puzzles I must solve.","isRequired":true,"rateValues":[1,2,3,4,5]},
			{"type":"rating","name":"question14","title":"The notion of thinking abstractly is appealing to me.","isRequired":true,"rateValues":[1,2,3,4,5]},
			{"type":"rating","name":"question15","title":"I would prefer a task that is intellectual, difficult, and" +
			" important to one that is somewhat important but does not require much thought.","isRequired":true,"rateValues":[1,2,3,4,5]},
			{"type":"rating","name":"question16","title":"I feel relief rather than satisfaction after completing a task" +
			" that requires a lot of mental effort.","isRequired":true,"rateValues":[1,2,3,4,5]},
			{"type":"rating","name":"question17","title":"It’s enough for me that something gets the job done; I don’t" +
			" care how or why it works.","isRequired":true,"rateValues":[1,2,3,4,5]},
			{"type":"rating","name":"question18","title":"I usually end up deliberating about issues even when they do not" +
			" affect me personally.","isRequired":true,"rateValues":[1,2,3,4,5]},
			{"type":"dropdown","name":"question19","title":"I identify myself as","isRequired":true,"choices":[{"value":"Female","text":"Female"},{"value":"Male","text":"Male"},{"value":"Equal","text":"Genderequeer"}]},
			{"type":"text","name":"question20","title":"How old are you","isRequired":true,"inputType":"number","min":"18","step":1}
			],
			"description":"For each of the statements below, please indicate whether or not the statement is characteristic of you or of what you believe. For example, if the statement is extremely uncharacteristic of you or of what you believe about yourself (not at all like you) please rate a \"1\". If the statement is extremely characteristic of you or of what you believe about yourself (very much like you) please rate a \"5\". \nYou should use the following scale as you rate each of the statements below.\n1=\"Extremely uncharacteristic of me\" \n2=\"Somewhat uncharacteristic of me\" \n3=\"uncertain\" \n4=\"Somewhat characteristic of me\" \n5=\"Extremely characteristic of me\""}
		]}
		return(
			<Survey.Survey
				json={ surveyJSON }
				onComplete={ this.calculateNFC }
				style={{'width': '1000px'}}
			
			/>
		);
	}
}



