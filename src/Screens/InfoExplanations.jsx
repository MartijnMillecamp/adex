import React, {Component} from 'react';
import '../Styling/global.css'
import classnames from 'classnames'
import styles from '../Styling/InfoExplanations.module.css';
import explanationsOpenness from '../Images/explanationsOpenness.svg'
import scatterplot from '../Images/scatterplot.svg'

import {addInteraction} from "../Utils/API";




export default class InfoExplanations extends Component{
	constructor(props){
		super(props)
		this.clickButton = this.clickButton.bind(this)
	}
	
	clickButton(){
		const userId = localStorage.getItem('userId');
		const openness = localStorage.getItem('openness');
		const versionUI = localStorage.getItem('version');
		addInteraction(userId, openness, versionUI, 'InfoExplanations', 'click', 1);
		this.props.history.push({
			pathname: '/InfoExplanationsSimple',
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
					<h2>Instructions (2)</h2>
					<p>
						Additionally, to help you understand why certain songs are recommended, one of the two applications provides explanations in the form of:
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
							src={explanationsOpenness}
							className={styleExplanationImage}
							alt="explanationsIndividual"
						/>
						<div
							className={styleTextExplanation}
						>
							For each song it will show five different elements:
							<ol>
								<li>The audio features of the song (bars)</li>
								<li>The audio features you requested (sliders in background of bars)</li>
								<li>The difference between the features of the song and the features you requested</li>
								<li>The goodness of fit between the features of the song and the features you requested</li>
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
							alt="scatter plot"
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
			</div>
			
			<button
				className={styleButton}
				onClick={this.clickButton}
			>Continue</button>
			
			</>
		
		
		)
	}
}

