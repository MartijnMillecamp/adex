import React, {Component} from 'react';
import '../Styling/global.css'
import logo from '../Images/KUL.png'
import classnames from 'classnames'
import styles from '../Styling/Welcome.module.css';
import {addInteraction} from '../Utils/API'


export default class Welcome extends Component{
	constructor(props){
		super(props)
		this.clickButton = this.clickButton.bind(this);
		this.generateUserId = this.generateUserId.bind(this);
	}
	
	generateUserId(){
		const userDate = new Date().getTime();
		const randomNb = Math.round(Math.random() * 100);
		const userDateString = userDate.toString();
		const randomNbString = randomNb.toString();
		return userDateString + randomNbString;
	}
	
	clickButton(){
		const userId = this.generateUserId();
		localStorage.setItem('userId', userId );
		addInteraction(userId, -1, 0, 'Welcome', 'click', 1);
		this.props.history.push({
			pathname: '/Protocol',
		})
	}
	
	render(){
		const styleHeaderDiv = classnames(styles.header);
		const styleHeaderLogo = classnames(styles.logo);
		const styleContainerText = classnames(styles.container);
		const styleButton = classnames(styles.button);
		
		return(
			<>
			<div
				className={styleHeaderDiv}
			>
				<img
					src={logo}
					alt="KU Leuven"
					className={styleHeaderLogo }
				/>
			</div>
			<div
				className={styleContainerText}
			>
				<h1>Welcome</h1>
				<p>Thanks for participating in this study.</p>
				<p>During this study, you are being invited to create two playlists in a music recommender system built upon Spotify.</p>
				<p>To participate in this study, you will need to log in to your Spotify account and fill in some questionnaires.</p>
				<p>
					By clicking continue you grant permission for the data generated from this study to be used for scientific purposes.
					Your name will not be published, anonymity and the confidentiality of the data is guaranteed at every stage of the research.
					For the further processing of the collected data, the public interest applies as the legal basis according to the AVG / GDPR.
					Discontinuation of participation in the study therefore means that the previously collected data can still be legally included in the study and must not be removed by KU Leuven.
				</p>
					<button
					className={styleButton}
					onClick={this.clickButton}
				>Continue</button>
			</div>
			
			
			</>
			
		)
	}
	
}