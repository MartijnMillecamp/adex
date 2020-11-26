import React, {Component} from 'react'
import '../Styling/global.css';
import styles from '../Styling/ExplanationFit.module.css';
import classnames from 'classnames';


export default class radialProgress extends Component{
	
	
	
	
	
	
	renderSVG(){
		const circumference = 100;
		const offset = circumference / 4;
		const strokeWidth = 2;
		const r = circumference / (2*Math.PI);
		const width= (2*r) + strokeWidth;
		const height = (2*r) + strokeWidth;
		const cx = width/2;
		const cy = height/2;
		const fontSize = 10;
		const x = cx;
		const y = cy + (fontSize/2);
		
		const fit= this.props.fit;
		const strokeLength = circumference / 100 * fit;
		const diff = circumference - strokeLength;
		const strokeDashArray = strokeLength + ',' + diff;
		
		const styleCircle = styles.circle;
		const styleText = styles.text;
		return(
			<>
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
			</>
		)
		
	}
	
	render(){
		return this.renderSVG()
	}
}