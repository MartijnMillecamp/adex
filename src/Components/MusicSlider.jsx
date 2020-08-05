import React, {Component} from 'react';
import Slider from '@material-ui/core/Slider';
import { withStyles, createStyles } from '@material-ui/core';



import '../Styling/global.css'
import styles from '../Styling/MusicSlider.module.css';
import classnames from 'classnames'





export default class MusicSlider extends Component{
	
	render(){
		const styleVerticalSlider = classnames(styles.verticalSlider);
		
		
		function thumbValue(props) {
			return (
				<span {...props}>
					{props["aria-valuenow"]}
        </span>
			);
		}
		
		
		const CustomSlider = withStyles({
			root: {
				color: this.props.color,
				padding: '13px 0',
			},
			vertical:{
				width: "15px",
			},
			thumb: {
				height: 30,
				width: 30,
				backgroundColor: this.props.color,
				marginTop: -12,
				marginLeft: -13,
				color: "white"
			},
			active: {},
			track: {
				height: 3,
			},
			rail: {
				color: '#d8d8d8',
				opacity: 1,
				width: "15px"
			},
		})(Slider);
		
		
		
		return(
			<>
			<CustomSlider
				orientation={'vertical'}
				ThumbComponent={thumbValue}
				getAriaLabel={(index) => (index === 0 ? 'Minimum price' : 'Maximum price')}
				defaultValue={50}
			/>
			
			</>
		)
	}

}