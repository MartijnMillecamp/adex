import React, {Component} from 'react';
import '../Styling/global.css'
import protocol from '../Images/protocol_openness.png'
import classnames from 'classnames'
import styles from '../Styling/Protocol.module.css';
import {addInteraction} from '../Utils/API'


export default class Protocol extends Component{
	constructor(props){
		super(props);
		this.clickButton = this.clickButton.bind(this)
	}
	
	clickButton(){
		const userId = localStorage.getItem('userId');
		addInteraction(userId, -1, 0, 'Protocol', 'click', 1);
		
		this.props.history.push({
			pathname: '/Openness',
		})
	}
	
	render(){
		const styleImageContainer = classnames('container-rows', styles.imageContainer);
		const styleTextContainer = classnames('container-rows', styles.textContainer);
		const styleButton = classnames(styles.button);
		const styleProtocol = classnames(styles.protocol);
		return(
			<>
				<div
					className={styleImageContainer}
				>
					<img
						src={protocol}
						className={styleProtocol}
						alt='protocol'
					/>
				
				</div>
				<div
					className={styleTextContainer}
				>
					<p>As illustrated by the figure, the experiment will follow the next steps:					</p>
					
					<ul>
							<li>On the next page you will be asked to fill in a questionnaire about your openness.</li>
							<li>Afterwards, you will get a small tutorial about the application.</li>
							<li>In the next step, you will be asked to login to your Spotify account.</li>
							<li>Then you will be redirected to the application to create a playlist.</li>
							<li>After creating this playlist, you will be asked to evaluate the application.</li>
							<li>Repeat steps 4 and 5 but in a different version of the application.</li>
							<li>Fill in a final questionnaire.</li>
							<li>You only have <b>ONE HOUR</b> to complete this task.</li>
						</ul>
					
				</div>
				<button
					className={styleButton}
					onClick={this.clickButton}
				>Continue</button>
				
			</>
			
			
		)
	}
}

