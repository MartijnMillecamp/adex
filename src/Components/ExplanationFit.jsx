import React, {Component} from 'react'
import '../Styling/global.css';
import styles from '../Styling/ExplanationFit.module.css';
import classnames from 'classnames';

export default class ExplanationFit extends Component{
	constructor(props){
		super(props);
		this.state={
			fit: this.calculateFit()
		}
		this.calculateFit = this.calculateFit.bind(this)
	}
	
	calculateFit(){
		const sliderValuesDict = this.props.sliderValueDict;
		const diffDanceability = Math.abs(parseFloat(this.props.danceability) - sliderValuesDict['danceability']) * 100;
		const diffEnergy = Math.abs(parseFloat(this.props.energy) - sliderValuesDict['energy']) * 100;
		const diffHappiness = Math.abs(parseFloat(this.props.happiness) - sliderValuesDict['happiness']) * 100;
		const diffPopularity = Math.abs(parseFloat(this.props.popularity) - sliderValuesDict['popularity']);
		const diff = diffDanceability + diffEnergy + diffHappiness + diffPopularity;
		return Math.round(10* (100.0 - (diff / 4))) / 10
	}
	
	
	renderSVG(){
		const circumference = 125;
		const offset = circumference / 4;
		const strokeWidth = 2;
		const width=circumference + strokeWidth;
		const height = circumference + strokeWidth;
		
		const r = circumference / (2*Math.PI);
		const cx = width/2;
		const cy = height/2;
		const fontSize = 10;
		const x = cx;
		const y = cy + (fontSize/2);
		
		const fit=this.state.fit;
		const strokeLength = circumference / 100 * fit;
		const diff = circumference - strokeLength;
		const strokeDashArray = strokeLength + ',' + diff;
		
		const styleCircle = styles.circle;
		const styleText = styles.text;
		
		return(
			<svg
				width={width}
				height={height}
			>
				<circle
					className={styleCircle}
					cx={cx}
					cy={cy}
					r={r}
					strokeDasharray={strokeDashArray}
					strokeDashoffset={offset}
				
				/>
				<text
					className={styleText}
					x={x}
					y={y}
				>
					{fit}
				</text>
			</svg>
		)
		
	}
	
	render(){
		
		
		return(
			this.renderSVG()
		)
	}
}