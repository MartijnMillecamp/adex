import React, {Component} from 'react'
import '../Styling/global.css';
import styles from '../Styling/ExplanationFit.module.css';
import classnames from 'classnames';
import Album from './Album'
import ExplanationFeatures from './ExplanationFeatures'

import {addInteraction} from "../Utils/API";



export default class ExplanationFit extends Component{
	constructor(props){
		super(props);
		this.state={
			fit: this.calculateFit(),
			tooltip: this.generateTooltip(),
			bars: false
		};
		this.calculateFit = this.calculateFit.bind(this);
		this.generateTooltip = this.generateTooltip.bind(this);
		this.handlerShowBars = this.handlerShowBars.bind(this);
		this.handlerHideBars = this.handlerHideBars.bind(this);
		this.renderBars = this.renderBars.bind(this)
	}
	
	handlerShowBars(){
		const userId = localStorage.getItem('userId');
		const ms = localStorage.getItem('ms');
		const versionUI = localStorage.getItem('version');
		addInteraction(userId, ms, versionUI, 'showBars', 'hover', 1);
		this.setState({
				bars: true
			}
		)
	}
	
	handlerHideBars(){
		this.setState({
			bars: false
		})
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
	
	generateTooltip(){
		const dance = "Danceability: " + Math.round(this.props.danceability * 100);
		const energy = "Energy: " + Math.round(this.props.energy * 100);
		const happiness = "Happiness: " + Math.round(this.props.happiness * 100);
		const popularity = "Popularity: " + this.props.popularity;
		return dance + "   " + energy + "   " + happiness +  "   " + popularity
	}
	
	
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
		
		const fit=this.state.fit;
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
	
	renderBars(){
		return(
			<ExplanationFeatures
				key={"exp_features" + this.props.id}
				danceability={this.props.danceability}
				energy={this.props.energy}
				happiness={this.props.happiness}
				popularity={this.props.popularity}
				sliderValueDict={this.props.sliderValueDict}
				colorDict={this.props.colorDict}
				iconDict={this.props.iconDict}
			/>
		)
	}
	
	render(){
		const styleContainer = classnames('container-rows', styles.container);
		const styleRow1 = classnames('container-columns', styles.row1);
		const styleRow2 = classnames(styles.row2);
		return(
			<div
				className={styleContainer}
			>
				<div
					className={styleRow1}
				>
					<Album
						key={"album_exp" + this.props.id}
						id={this.props.id}
						album={this.props.album}
						preview_url={this.props.preview_url}
						handlerPlaySong = {this.props.handlerPlaySong}
						handlerPauseSong = {this.props.handlerPauseSong}
						playing = {this.props.playing}
						size = {'explSeed'}
						playable = {true}
						handlerLogging={this.props.handlerLogging}
					/>
					<div
						onMouseEnter={this.handlerShowBars}
						onMouseLeave={this.handlerHideBars}
					>
						{this.state.bars ?
							<ExplanationFeatures
								key={"exp_features" + this.props.id}
								danceability={this.props.danceability}
								energy={this.props.energy}
								happiness={this.props.happiness}
								popularity={this.props.popularity}
								sliderValueDict={this.props.sliderValueDict}
								colorDict={this.props.colorDict}
								iconDict={this.props.iconDict}
								tooltip={false}
							/>
							:
							this.renderSVG()
						}
					
					</div>
					
					<Album
						key={"album_exp_seed_" + this.props.id}
						id={this.props.seedId}
						album={this.props.seedAlbum}
						preview_url={null}
						size = {'explSeed'}
						playable = {false}
					/>
				</div>
				<div
					className={styleRow2}
				>
					This song is recommended because it is a <b>{this.state.fit} % fit </b>
					and because it is similar to <b>{this.props.seedTitle}</b>.
				</div>
			</div>
		)
	}
}