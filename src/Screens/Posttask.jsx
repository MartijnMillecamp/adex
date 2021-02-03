import React, { Component} from 'react'
import '../Styling/global.css';
import * as Survey from "survey-react";
import styles from '../Styling/Posttask.module.css';
import classnames from 'classnames';
import {addPostTask} from "../Utils/API";
import {addInteraction} from '../Utils/API'




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
		const userId = localStorage.getItem('userId');
		const openness = localStorage.getItem('openness');
		const versionUI = localStorage.getItem('version');
		addPostTask(userId, openness, versionUI, data);
		addInteraction(userId, openness, versionUI, 'finishPostTask', 'click', 1);
		const nbTested = localStorage.getItem('nbTested');
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
		const styleContainer = classnames('container-rows', styles.container);
		const styleDivSurvey = classnames(styles.divSurvey)
		var surveyJSON = {"pages":[
			{"name":"page1","elements":[
				{"type":"rating","name":"question1","title":"Je geeft geen toelichting en laat betijen","isRequired":true,"rateMax":7,"minRateDescription":"Helemaal niet van toepassing","maxRateDescription":"Helemaal van toepassing"},
				{"type":"rating","name":"question2","title":"Je erkent in een gesprek de frustratie en geeft een zinvolle reden voor de niet-selectie","isRequired":true,"rateMax":7,"minRateDescription":"Helemaal niet van toepassing","maxRateDescription":"Helemaal van toepassing"},
				{"type":"rating","name":"question3","title":"Je zegt: 'Je moet dit leren aanvaarden. Dit is nu eenmaal mijn beslissing.'","isRequired":true,"rateMax":7,"minRateDescription":"Helemaal niet van toepassing","maxRateDescription":"Helemaal van toepassing"},
				{"type":"rating","name":"question4","title":"Je geeft aan welke stappen nodig zijn voor een selectie in de toekomst.","isRequired":true,"rateMax":7,"minRateDescription":"Helemaal niet van toepassing","maxRateDescription":"Helemaal van toepassing"}
				],"title":"Je merkt dat een sporter niet tevreden is dat hij niet in de wedstrijdselectie werd opgenomen. Hoe reageer je hierop?"},
			{"name":"page2","elements":[
				{"type":"rating","name":"question5","title":"Je overloopt met hem nog eens de stappen om zijn taken goed uit" +
				" te voeren.","isRequired":true,"rateMax":7,"minRateDescription":"Helemaal niet van toepassing","maxRateDescription":"Helemaal van toepassing"},
				{"type":"rating","name":"question6","title":"Je spreekt er de sporter niet over aan. Het zal wel overgaan in" +
				" de wedstrijd.","isRequired":true,"rateMax":7,"minRateDescription":"Helemaal niet van toepassing","maxRateDescription":"Helemaal van toepassing"},
				{"type":"rating","name":"question7","title":"Je vraagt of hij gestresseerd is en je nodigt hem uit om erover" +
				" te praten.","isRequired":true,"rateMax":7,"minRateDescription":"Helemaal niet van toepassing","maxRateDescription":"Helemaal van toepassing"},
				{"type":"rating","name":"question8","title":"Je zegt: ‘Je moet leren omgaan met stress. Zo niet, wordt de" +
				" wedstrijd een flop.’","isRequired":true,"rateMax":7,"minRateDescription":"Helemaal niet van toepassing","maxRateDescription":"Helemaal van toepassing"}
				],"title":"Een sporter lijkt in de aanloop naar een wedstrijd last te hebben van faalangst. Hoe reageer je?"},
			{"name":"page3","elements":[
				{"type":"rating","name":"question9","title":"Je laat je niet in met de opwarming. Ze kennen genoeg" +
				" oefeningen uit de training.","isRequired":true,"rateMax":7,"minRateDescription":"Helemaal niet van toepassing","maxRateDescription":"Helemaal van toepassing"},
				{"type":"rating","name":"question10","title":"Je geeft aan dat je verwacht dat iedereen zich goed en scherp opwarmt.","isRequired":true,"rateMax":7,"minRateDescription":"Helemaal niet van toepassing","maxRateDescription":"Helemaal van toepassing"},
				{"type":"rating","name":"question11","title":"Je geeft de sporters zelf de verantwoordelijkheid om te kiezen voor een deel van de opwarmingsoefeningen en laat ruimte voor persoonlijke accenten.","isRequired":true,"rateMax":7,"minRateDescription":"Helemaal niet van toepassing","maxRateDescription":"Helemaal van toepassing"},
				{"type":"rating","name":"question12","title":"Je waarschuwt de sporters dat ze scherp moeten opwarmen anders wordt de wedstrijd een afgang.","isRequired":true,"rateMax":7,"minRateDescription":"Helemaal niet van toepassing","maxRateDescription":"Helemaal van toepassing"}
				],"title":"De opwarming voor de wedstrijd verloopt op de volgende manier:"}
				
				
		
				
				
		]}
		
		
		return(
			<div
				className={styleContainer}
			>
				<div
					className={styleDivSurvey}
				>
					<Survey.Survey json={ surveyJSON } onComplete={ this.goToNext } />
				</div>
			</div>
			
		);
	}
}



