import React, {Component} from 'react';
import VerticalSlider from './VerticalSlider'



import '../Styling/global.css'
import styles from '../Styling/Sliders.module.css';
import classnames from 'classnames'




export default class Sliders extends Component{
	
	render(){
		const styleContainerSliders = classnames("container-columns", styles.containerSliders);
		
		
		return (
			<div className={styleContainerSliders}>
				<VerticalSlider
					feature={"danceability"}
					color = {this.props.colorDict['danceability']}
					icon = {this.props.iconDict['danceability']}
					handlerSliderChange = {this.props.handlerSliderChange}
					values={[Math.round(this.props.sliderValueDict['danceability']*100)]}
					handlerLogging={this.props.handlerLogging}
				/>
				<VerticalSlider
					feature={"energy"}
					color = {this.props.colorDict['energy']}
					icon = {this.props.iconDict['energy']}
					handlerSliderChange = {this.props.handlerSliderChange}
					values={[Math.round(this.props.sliderValueDict['energy']*100)]}
					handlerLogging={this.props.handlerLogging}
				
				
				/>
				<VerticalSlider
					feature={"happiness"}
					color = {this.props.colorDict['happiness']}
					icon = {this.props.iconDict['happiness']}
					handlerSliderChange = {this.props.handlerSliderChange}
					values={[Math.round(this.props.sliderValueDict['happiness']*100)]}
					handlerLogging={this.props.handlerLogging}
				
				
				/>
				<VerticalSlider
					feature={"popularity"}
					color = {this.props.colorDict['popularity']}
					icon = {this.props.iconDict['popularity']}
					handlerSliderChange = {this.props.handlerSliderChange}
					values={[Math.round(this.props.sliderValueDict['popularity'])]}
					handlerLogging={this.props.handlerLogging}
				
				
				/>
			</div>
		
		)
	}
	
}