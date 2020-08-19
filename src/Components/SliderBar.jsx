import React, {Component} from 'react'
import '../Styling/global.css';
import styles from '../Styling/SliderBar.module.css';
import classnames from 'classnames';

export default class SliderBar extends Component{
	
	
	
	render(){
		const totalHeight = 100;
		const totalWidth = 20;
		const topSlider = totalHeight-this.props.sliderValue;
		const topBar = totalHeight - this.props.barValue;
		const styleContainer = classnames(styles.container)
		const styleSliderContainer = {
			position: "relative",
			width: "6px",
			height: this.props.sliderValue + "px",
			backgroundColor: "blue",
			top: topSlider + "px",
			left: "7px"
		};
		const styleBar = {
			position: "relative",
			width: totalWidth + 'px',
			height: this.props.barValue + "px",
			backgroundColor: "red",
			opacity: "0.8",
			top: topBar + "px",
		};
		
		return(
			<div
				className={styleContainer}
			>
				<div
					style={styleSliderContainer}
				></div>
				<div
					style={styleBar}
				></div>
			</div>
		)
	}
}