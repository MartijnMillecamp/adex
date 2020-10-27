import React, {Component} from 'react'
import '../Styling/global.css';
import styles from '../Styling/ExplanationFeatures.module.css';
import classnames from 'classnames';
import SliderBar from "./SliderBar"

export default class ExplanationFeatures extends Component{
	render(){
		const styleContainer=classnames('container-columns', styles.container);
		return(
			<>
			<div
				className={styleContainer}
			>
				<SliderBar
					key={"sliderBar_danceability" + this.props.id}
					feature={"Danceability"}
					color = {this.props.colorDict['danceability']}
					sliderValue={Math.round(this.props.sliderValueDict['danceability']*100)}
					barValue={Math.round(this.props.danceability * 100)}
					tooltip={this.props.tooltip}
				/>
				<SliderBar
					key={"sliderBar_energy" + this.props.id}
					feature={"Energy"}
					color = {this.props.colorDict['energy']}
					sliderValue={Math.round(this.props.sliderValueDict['energy']*100)}
					barValue={Math.round(this.props.energy * 100)}
					tooltip={this.props.tooltip}
				
				/>
				<SliderBar
					key={"sliderBar_happiness" + this.props.id}
					feature={"Happiness"}
					color = {this.props.colorDict['happiness']}
					sliderValue={Math.round(this.props.sliderValueDict['happiness']*100)}
					barValue={Math.round(this.props.happiness * 100)}
					tooltip={this.props.tooltip}
				
				/>
				<SliderBar
					key={"sliderBar_popularity" + this.props.id}
					feature={"Popularity"}
					color = {this.props.colorDict['popularity']}
					sliderValue={Math.round(this.props.sliderValueDict['popularity'])}
					barValue={Math.round(this.props.popularity)}
					tooltip={this.props.tooltip}
				
				/>
			</div>
			
			</>
		)
	}



}
