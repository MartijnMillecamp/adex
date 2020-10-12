import React, { Component} from 'react'
import '../Styling/global.css';
import classnames from 'classnames';
import styles from '../Styling/Final.module.css'
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
		const styleContainer = classnames('container-rows', styles.container);
		const styleDivSurvey = classnames(styles.divSurvey)
			"choices":[{"value":"item1","text":"only for one song and only if I ask for it."},
				{"value":"item2","text":"for all songs, but only if I ask for it."},
				{"value":"item3","text":"at any time and for all songs."},
				{"value":"item4","text":"I do not need this information."}
			
			],"hasOther":true},
			{"type":"text","name":"question2","title":"Why do you prefer to see this information for one song/for all" +
			" songs/not at all?","isRequired":true},
			{"type":"text","name":"question3","title":"Any other comments?","isRequired":true},
			]}]}
		
		
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


