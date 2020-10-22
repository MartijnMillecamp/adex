import React, {Component} from 'react';
import '../Styling/global.css'
import logo from '../Images/KUL.png'
import classnames from 'classnames'
import styles from '../Styling/Welcome.module.css';



export default class Thanks extends Component{
	constructor(props){
		super(props)
		this.clickButton = this.clickButton.bind(this)
	}
	
	clickButton(){
		// addInteraction();
		this.props.history.push({
			pathname: '/Protocol',
		})
	}
	
	render(){
		const styleHeaderDiv = classnames(styles.header);
		const styleHeaderLogo = classnames(styles.logo);
		const styleContainerText = classnames(styles.container);
		const userId = localStorage.getItem('userId');
		const nfc = localStorage.getItem('nfc');
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
				<h1>Thanks</h1>
				<p>Thanks for participating in this study.</p>
				<p>Your id was: {userId}</p>
				<p>The first questionnaire tested your need for cognition which is a construct to measure how much you enjoy cognitive tasks.</p>
				<p>You scored a need for cognition of {nfc}. The minimal score is 0, the maximum score is 72.</p>
				<p>If you have questions/requests/comments please send an email to martijn.millecamp@cs.kuleuven.be with your id as subject.</p>
			</div>
			
			
			</>
		
		)
	}
	
}