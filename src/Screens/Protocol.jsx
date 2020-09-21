import React, {Component} from 'react';
import '../Styling/global.css'
import protocol from '../Images/protocol.svg'
import classnames from 'classnames'
import styles from '../Styling/Protocol.module.css';


export default class Protocol extends Component{
	constructor(props){
		super(props)
		this.clickButton = this.clickButton.bind(this)
	}
	
	clickButton(){
		// addInteractionLocal();
		this.props.history.push({
			pathname: '/NFC',
		})
	}
	
	render(){
		const styleImageContainer = classnames('container-rows', styles.imageContainer);
		const styleTextContainer = classnames('container-rows', styles.textContainer);
		const styleButton = classnames(styles.button);
		return(
			<>
				<div
					className={styleImageContainer}
				>
					<img
						src={protocol}
					/>
				
				</div>
				<div
					className={styleTextContainer}
				>
					<p>As illustrated by the figure, the experiment will follow next steps</p>
					<ol>
						<li>On the next page you will be asked to fill in a questionnaire about your thinking style.</li>
						<li>Afterwards you will be asked to login to your Spotify account.</li>
						<li>In the next step, you will get a small tutorial about the application.</li>
						<li>Then you will be redirected to the application to create a playlist.</li>
						<li>After creating this playlist, you will be asked to evaluate the application.</li>
						<li>Repeat steps 4 and 5 but in a different version of the application.</li>
						<li>Fill in a final questionnaire.</li>
					</ol>
					
				</div>
				<button
					className={styleButton}
					onClick={this.clickButton}
				>Continue</button>
				
			</>
			
			
		)
	}
}

