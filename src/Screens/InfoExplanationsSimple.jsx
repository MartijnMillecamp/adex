import React, {Component} from 'react';
import '../Styling/global.css'
import classnames from 'classnames'
import styles from '../Styling/InfoExplanations.module.css';
import explanations from '../Images/explanations_simple.svg'

import {addInteraction} from "../Utils/API";




export default class InfoExplanations extends Component{
	constructor(props){
		super(props)
		this.clickButton = this.clickButton.bind(this)
	}
	
	clickButton(){
		const userId = localStorage.getItem('userId');
		const ms = localStorage.getItem('ms');
		const versionUI = localStorage.getItem('version');
		addInteraction(userId, ms, versionUI, 'InfoExplanations', 'click', 1);
		this.props.history.push({
			pathname: '/InfoSources',
		})
	}
	
	render(){
		const styleContainerExp = classnames('container-columns', styles.containerExp);
		const styleContainer =classnames('container-rows', styles.container);
		const styleTextContainer = classnames('container-rows', styles.textContainer);
		const styleButton = classnames(styles.button);
		const styleExplanation = classnames('container-rows', styles.explanation);
		const styleScatterplot = classnames('container-rows', styles.scatterplotContainer);
		const styleTextExplanation = classnames(styles.textExplanation);
		const styleExplanationImage = classnames(styles.explanationImage);
		const styleScatterplotImage = classnames(styles.scatterplotImage);
		return(
			<>
			<div
				className={styleContainer}
			>
				<div
					className={styleTextContainer}
				>
					<h2>Instructions (3)</h2>
					<p>
						The other application does not provide an explanation in the form of a scatter plot, but it does provide individual explanations:
					</p>
				</div>
				<div
					className={styleContainerExp}
				>
					<div
						className={styleExplanation}
					>
						<h3>1. Individual explanations</h3>
						<img
							src={explanations}
							className={styleExplanationImage}
							alt="explanationsIndividual"
						/>
						<div
							className={styleTextExplanation}
						>
							For each song this explanation shows two different elements:
							<ol>
								<li>The fit between the features of this song and the features you requested</li>
								<li>The song in your playlist on which this recommendation is based</li>
							</ol>
						</div>
					</div>
				</div>
			</div>
			<div
				className={styleTextContainer}
			>
				<p>
					In case you don't want the explanations, you can turn them off at the bottom of the page.
				</p>
				
			</div>
			
			
			<button
				className={styleButton}
				onClick={this.clickButton}
			>Continue</button>
			
			</>
		
		
		)
	}
}

