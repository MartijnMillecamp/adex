import React, {Component} from 'react';
import VerticalSlider from './VerticalSlider'



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
				<VerticalSlider
					feature={"Danceability"}
					color = {this.props.colorDict['danceability']}
					icon = {this.props.iconDict['danceability']}
				/>
				<VerticalSlider
					feature={"Energy"}
					color = {this.props.colorDict['energy']}
					icon = {this.props.iconDict['energy']}
				
				
				/>
				<VerticalSlider
					feature={"Happiness"}
					color = {this.props.colorDict['happiness']}
					icon = {this.props.iconDict['happiness']}
				
				
				/>
				<VerticalSlider
					feature={"Popularity"}
					color = {this.props.colorDict['popularity']}
					icon = {this.props.iconDict['popularity']}
				
				
				/>
			</div>
		
		)
	}
	
}