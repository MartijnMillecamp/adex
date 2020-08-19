import React, {Component} from 'react'
import '../Styling/global.css';

export default class SliderBar extends Component{
	
	getY(chartHeight, value, marginTop){
		const pixels = this.getHeight(chartHeight, value)
		return chartHeight - pixels + marginTop
	}
	
	getHeight(chartHeight, value){
		return (value / 100) * chartHeight;
	}
	
	getDiff(){
		const diff = Math.abs(this.props.sliderValue - this.props.barValue);
		if (this.props.sliderValue > this.props.barValue){
			return "-" + diff;
		}
		else{
			return "+" + diff;
		}
	}
	
	render(){
		const marginTop = 2;
		const marginBottom=5;
		const totalHeight = 72;
		const chartHeight = 50;
		const totalWidth = 40;
		const chartWidth = 20;
		const sliderWidth = 4;
		const handleWidth = 10;
		const handleHeight = 6;
		const handleRadius = 3;
		const topSlider = this.getY(chartHeight, this.props.sliderValue, marginTop);
		const topBar = this.getY(chartHeight, this.props.barValue, marginTop);
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
				/>
				<rect
					height={this.getHeight(chartHeight, this.props.sliderValue)}
					width={sliderWidth}
					y={topSlider}
					x={(totalWidth - sliderWidth)/2}
					fill={this.props.color}
				/>
				<rect
					height={this.getHeight(chartHeight, this.props.barValue)}
					width={chartWidth}
					y={topBar}
					x={(totalWidth-chartWidth) / 2}
					fill={this.props.color}
					opacity={0.7}
					stroke={'#000000'}
					strokeWidth={"1px"}
				/>
				<line
					x1={0}
					y1={chartHeight + marginTop}
					x2={totalWidth}
					y2={chartHeight + marginTop}
					stroke={'#000000'}
					strokeWidth={"1px"}
				/>
				<text
					textAnchor={"middle"}
					x={totalWidth/2}
					y={totalHeight - marginBottom}
					fill={"#000000"}
					fontSize={10}
				>
					{this.getDiff()}
				</text>
			
			</svg>
		)
	}
}