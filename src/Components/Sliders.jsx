import React, {Component} from 'react';
import MusicSlider from './MusicSlider'


import '../Styling/global.css'
import styles from '../Styling/Sliders.module.css';
import classnames from 'classnames'




export default class Sliders extends Component{

	
	render(){
		const styleContainerSliders = classnames("container-columns", styles.containerSliders);
		function valuetext(value) {
			return `${value}°C`;
		}
		
		return (
			<div className={styleContainerSliders}>
				<MusicSlider
					feature={"Danceability"}
					color = {this.props.colorDict['danceability']}
				/>
				{/*<MusicSlider*/}
					{/*feature={"Energy"}*/}
					{/*color = {this.props.colorDict['energy']}*/}
				
				{/*/>*/}
				{/*<MusicSlider*/}
					{/*feature={"Happiness"}*/}
					{/*color = {this.props.colorDict['happiness']}*/}
				
				{/*/>*/}
				{/*<MusicSlider*/}
					{/*feature={"Popularity"}*/}
					{/*color = {this.props.colorDict['popularity']}*/}
				
				{/*/>*/}
			</div>
		
		)
	}
	
}