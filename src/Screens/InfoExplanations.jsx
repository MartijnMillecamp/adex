import React, {Component} from 'react';
import '../Styling/global.css'
import classnames from 'classnames'
import styles from '../Styling/InfoExplanations.module.css';
import explanations from '../Images/explanations.svg'



export default class InfoExplanations extends Component{
	constructor(props){
		super(props)
		this.clickButton = this.clickButton.bind(this)
	}
	
	clickButton(){
		// addInteractionLocal();
		this.props.history.push({
			pathname: '/Home',
		})
	}
	
	render(){
		const styleContainerExp = classnames('container-columns', styles.containerExp);
		const styleTextContainer = classnames('container-rows', styles.textContainer);
		const styleButton = classnames(styles.button);
		const styleExplanation = classnames('container-rows', styles.explanation);
		const styleTextExplanation = classnames(styles.textExplanation);
		const styleExplanationImage = classnames(styles.explanationImage);
		return(
			<>
			<div
				className={styleTextContainer}
			>
				<h2>Instructions (2)</h2>
				<p>
					To help you understand why certain songs are recommended, the application provides two kinds of explanations:
				</p>
			</div>
			
			<div
				className={styleContainerExp}
			>
				<div
					className={styleExplanation}
				>
					<img
						src={explanations}
						className={styleExplanationImage}
					/>
					<div
						className={styleTextExplanation}
					>
						For each song we show four different elements:
						<ol>
							<li>The audio features of the song (bars)</li>
							<li>The audio features you requested (sliders in background of bars)</li>
							<li>The difference between the features of this song and the features you requested</li>
							<li>The song in your playlist on which this recommendation is based</li>
						</ol>
					</div>
				</div>
			
			
			
			
			</div>
			<button
				className={styleButton}
				onClick={this.clickButton}
			>Continue</button>
			
			</>
		
		
		)
	}
}

