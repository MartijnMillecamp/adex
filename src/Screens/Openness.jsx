import React, { Component} from 'react'
import '../Styling/global.css';
import classnames from 'classnames';
import styles from '../Styling/Openness.module.css'
import * as Survey from "survey-react";
import {addUser} from "../Utils/API";
import {addInteraction} from "../Utils/API";




export default class MS extends Component{
	constructor(props){
		super(props)
		this.calculateOpenness = this.calculateOpenness.bind(this)
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
	
	calculateOpenness(survey){
		const data = survey.data;
		let nbQuestions = 10;
		let total = 0;
		let reversed = [7,9];
		for (let i = 1; i < nbQuestions +1; i++){
			let rawScore = parseInt(data['question' + i]);
			if (reversed.indexOf(i) !== -1 ){
				total += (5 - rawScore)
			}
			else{
				total += (rawScore -1)
			}
		}
		localStorage.setItem('openness', total );
		
		const userId = localStorage.getItem('userId');
		let gender = survey.data['question11'];
		let age = survey.data['question12'];
		let attention = survey.data['question13'];
		addUser(userId, total, gender, age, attention);
		
		this.setVersion(userId);
		
		addInteraction(userId, total, 0, 'Openness', 'click', 1);
		
		this.props.history.push({
			pathname: '/InfoSliders',
		})
	}
	
	
	render(){
		const styleContainer = classnames('container-rows', styles.container);
		const styleDivSurvey = classnames(styles.divSurvey);
		var surveyJSON = {"pages":[{"name":"page1","elements":[
			{"type":"rating","name":"question1","title":"I see myself as someone who is original, comes up with new ideas.","isRequired":true,"minRateDescription":"Disagree strongly","maxRateDescription":"Agree strongly"},
			{"type":"rating","name":"question2","title":"I see myself as someone who is curious about many different things.","isRequired":true,"minRateDescription":"Disagree strongly","maxRateDescription":"Agree strongly"},
			{"type":"rating","name":"question3","title":"I see myself as someone who is ingenious, a deep thinker.","isRequired":true,"minRateDescription":"Disagree strongly","maxRateDescription":"Agree strongly"},
			{"type":"rating","name":"question4","title":"I see myself as someone who has an active imagination.","isRequired":true,"minRateDescription":"Disagree strongly","maxRateDescription":"Agree strongly"},
			{"type":"rating","name":"question5","title":"I see myself as someone who is inventive.","isRequired":true,"minRateDescription":"Disagree strongly","maxRateDescription":"Agree strongly"},
			{"type":"rating","name":"question6","title":"I see myself as someone who values artistic, aesthetic experiences.","isRequired":true,"minRateDescription":"Disagree strongly","maxRateDescription":"Agree strongly"},
			{"type":"rating","name":"question13","title":"I see myself as someone who pays attention and fills in 2.","isRequired":true,"minRateDescription":"Disagree strongly","maxRateDescription":"Agree strongly"},
			{"type":"rating","name":"question7","title":"I see myself as someone who prefers work that is routine.","isRequired":true,"minRateDescription":"Disagree strongly","maxRateDescription":"Agree strongly"},
			{"type":"rating","name":"question8","title":"I see myself as someone who likes to reflect, play with ideas.","isRequired":true,"minRateDescription":"Disagree strongly","maxRateDescription":"Agree strongly"},
			{"type":"rating","name":"question9","title":"I see myself as someone who has few artistic interests.","isRequired":true,"minRateDescription":"Disagree strongly","maxRateDescription":"Agree strongly"},
			{"type":"rating","name":"question10","title":"I see myself as someone who is sophisticated in art, music, or" +
			" literature.","isRequired":true,"minRateDescription":"Disagree strongly","maxRateDescription":"Agree strongly"},
			{"type":"dropdown","name":"question11","title":"I identify myself as","isRequired":true,"choices":[{"value":"Female","text":"Female"},{"value":"Male","text":"Male"},{"value":"Equal","text":"Genderqueer"}]},
			{"type":"text","name":"question12","title":"How old are you","isRequired":true,"inputType":"number","min":"18","step":1}
			
			],"title":"Here are a number of characteristics that may or may not apply to you. For example, do you agree that you are someone who likes to spend time with others? Please write a number next to each statement to indicate the extent to which you agree or disagree with that statement.","description":"1: Disagree strongly      2: Disagree a little     3: Neither agree nor disagree     4: Agree a little     5: Agree strongly"}]}
		
		
		return(
			<div
				className={styleContainer}
			>
				<div
					className={styleDivSurvey}
				>
					<Survey.Survey json={ surveyJSON } onComplete={ this.calculateOpenness } />
				</div>
			</div>
		
		);
	}
}



