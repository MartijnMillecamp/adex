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
				<p>If you have questions/requests/comments please send an email to martijn.millecamp@cs.kuleuven.be</p>
			</div>
			
			
			</>
		
		)
	}
	
}