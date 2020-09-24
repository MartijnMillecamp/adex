import React, {Component} from 'react';
import '../Styling/global.css'
import classnames from 'classnames'
import styles from '../Styling/InfoExplanations.module.css';
import explanations from '../Images/explanations.svg'
import scatterplot from '../Images/scatterplot.svg'

import {addInteractionLocal} from "../Utils/API";




export default class InfoExplanations extends Component{
	constructor(props){
		super(props)
		this.clickButton = this.clickButton.bind(this)
	}
	
	clickButton(){
		const userId = localStorage.getItem('userId');
		const nfc = localStorage.getItem('nfc');
		const versionUI = localStorage.getItem('version');
		addInteractionLocal(userId, nfc, versionUI, 'InfoExplanations', 'click', 1);		this.props.history.push({
			pathname: '/Home',
		})
	}
	
	render(){
		const styleContainerExp = classnames('container-columns', styles.containerExp);
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
				className={styleTextContainer}
			>
				<h2>Instructions (2)</h2>
				<p>
					Additionally, to help you understand why certain songs are recommended, the application provides two kinds of explanations:
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
					/>
					<div
						className={styleTextExplanation}
					>
						For each song it will show four different elements:
						<ol>
							<li>The audio features of the song (bars)</li>
							<li>The audio features you requested (sliders in background of bars)</li>
							<li>The difference between the features of this song and the features you requested</li>
							<li>The song in your playlist on which this recommendation is based</li>
						</ol>
					</div>
				</div>
				
				<div
					className={styleScatterplot}
				>
					<h3>2. Scatter plot</h3>
					<img
						src={scatterplot}
						className={styleScatterplotImage}
					/>
					<div
						className={styleTextExplanation}
					>
						It will also show an overview of the features of all songs which are represented by circles:
						<ol>
							<li>The position on the y-axes indicates the danceability</li>
							<li>The position on the x-axes indicates the energy</li>
							<li>The color indicates the happiness</li>
							<li>The size indicates the popularity</li>
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

