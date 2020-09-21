import React, {Component} from 'react';
import '../Styling/global.css'
import sliders from '../Images/protocol.svg'
import danceability from '../Images/danceability.svg'
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
			pathname: '/InfoScatterplot',
		})
	}
	
	render(){
		const styleImageContainer = classnames('container-rows', styles.imageContainer);
		const styleTextContainer = classnames('container-rows', styles.textContainer);
		const styleButton = classnames(styles.button);
		return(
			<>
			<div
				className={styleTextContainer}
			>
				<p>
					The purpose of the application you will test, is to make it easier for you to create a playlist.
					Before you start creating a playlist, you need to get familiar with the steps you can take to create that playlist.
				</p>
				<p>
					When you enter the application, there is already one song in your playlist based on your listening history on Spotify.
					This song is used to generate recommendations that are similar to that song, which you will see in a list on the right side.
					You will also be able to change four audio features, to steer the recommendation process towards the music you are looking for.
				</p>
				<ul>
					<li>
						<img src={danceability}/> Danceability: How danceable does the music need to be?
					</li>
					
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

