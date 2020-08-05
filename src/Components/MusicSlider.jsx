import React, {Component} from 'react';
import SliderRC, { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';

export default class Slider extends Component{
	
	render(){
		return(
			<>
			<SliderRC />
			<Range />
			</>
		)
	}

}