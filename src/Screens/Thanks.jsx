import React, {Component} from 'react';
import '../Styling/global.css'
import logo from '../Images/KUL.png'
import classnames from 'classnames'
import styles from '../Styling/Welcome.module.css';



export default class Thanks extends Component{
	constructor(props){
		super(props)
	}
	

	
	render(){
		const styleHeaderDiv = classnames(styles.header);
		const styleHeaderLogo = classnames(styles.logo);
		const styleContainerText = classnames(styles.container);
		const userId = localStorage.getItem('userId');
		const openness = localStorage.getItem('openness');
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
				<p>The first questionnaire tested your openness which is a construct to measure how open you are for new experiences.</p>
				<p>You scored an openness of {openness}. The minimal score is 0, the maximum score is 50.</p>
				<p>If you have questions/requests/comments please send an email to martijn.millecamp@cs.kuleuven.be with your id as subject.</p>
			</div>
			
			
			</>
		
		)
	}
	
}