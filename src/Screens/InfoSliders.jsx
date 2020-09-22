import React, {Component} from 'react';
import '../Styling/global.css'
import danceability from '../Images/danceability.svg'
import energy from '../Images/energy.svg'
import happiness from '../Images/happiness.svg'
import popularity from '../Images/popularity.svg'
import sliders from '../Images/sliders.png'

import classnames from 'classnames'
import styles from '../Styling/InfoSliders.module.css';


export default class InfoSliders extends Component{
	constructor(props){
		super(props)
		this.clickButton = this.clickButton.bind(this)
	}
	
	clickButton(){
		// addInteractionLocal();
		this.props.history.push({
			pathname: '/InfoExplanations',
		})
	}
	
	render(){
		const styleImage = classnames(styles.image);
		const styleTextContainer = classnames('container-rows', styles.textContainer);
		const styleButton = classnames(styles.button);
		const styleContainerCenter = classnames('container-rows', styles.containerCenter);
		return(
			<>
			<div
				className={styleTextContainer}
			>
				<h2>Instructions</h2>
				<p>
					When you enter the application in the next step, there will be already one song in your playlist based on your listening history on Spotify.
					This song is used to generate recommendations that are similar to that song, which you will see in a list on the right side.
					You will also be able to change four audio features, to steer the recommendation process towards the music you are looking for.
				</p>
				<div
					className={styleContainerCenter}
				>
					<ul>
						<li><img src={danceability} alt={'danceability'}/> Danceability: How danceable does the music need to be?</li>
						<li><img src={energy} alt={'energy'}/> Energy: How much energy does the music need to contain?</li>
						<li><img src={happiness} alt={'happiness'}/> Happiness: How happy does the music need to sound?</li>
						<li><img src={popularity} alt={'popularity'}/> Popularity: How popular does the song need to be nowadays?</li>
					</ul>
					<img
						src={sliders}
						className={styleImage}
						alt={'sliders'}
					/>
					
				</div>
				
				<p>For example, in this case you are looking for danceable, happy songs with a moderate amount of energy which are not very popular. </p>
			
			
			</div>
			<button
				className={styleButton}
				onClick={this.clickButton}
			>Continue</button>
			
			</>
		
		
		)
	}
}

