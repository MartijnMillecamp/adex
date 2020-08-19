import React, {Component} from 'react'
import '../Styling/global.css';
import styles from '../Styling/SliderBar.module.css';
import classnames from 'classnames';

export default class SliderBar extends Component{
	
	getY(totalHeight, value){
		const pixels = (value / 100) * totalHeight
		return totalHeight - pixels
	}
	
	render(){
		const totalHeight = 50;
		const totalWidth = 20;
		const sliderWidth = 4;
		const handleWidth = 10;
		const handleHeight = 6;
		const handleRadius = 3;
		const topSlider = this.getY(totalHeight, this.props.sliderValue);
		const topBar = this.getY(totalHeight, this.props.barValue);
		const styleSVG = {
			width: totalWidth,
			height: totalHeight,
		};
		
		
		return(
			<svg
				style={styleSVG}
			>
				<rect
					height={handleHeight}
					width={handleWidth}
					y={topSlider}
					x={(totalWidth - handleWidth)/2}
					rx={handleRadius}
					ry={handleRadius}
					fill={this.props.color}
				></rect>
				<rect
					height={this.props.sliderValue}
					width={sliderWidth}
					y={topSlider}
					x={(totalWidth - sliderWidth)/2}
					fill={this.props.color}
				></rect>
				<rect
					height={this.props.barValue}
					width={totalWidth}
					y={topBar}
					x={0}
					fill={this.props.color}
					opacity={0.7}
					stroke={'#000000'}
					strokeWidth={"1px"}
				></rect>
			
			</svg>
		)
	}
}