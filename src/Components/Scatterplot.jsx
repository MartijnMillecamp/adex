import React, {Component} from 'react'
import '../Styling/global.css';
import styles from '../Styling/Scatterplot.module.css';
import classnames from 'classnames';
import * as d3 from 'd3';




export default class Scatterplot extends Component{
	constructor(props){
		super(props);
		this.refSVG = React.createRef()
	}
	
	findMax(array){
		const maxXData = Math.max.apply(Math, array.map(function(o) { return o['energy']; }));
		const maxYData = Math.max.apply(Math, array.map(function(o) { return o['danceability']; }));
		const maxCData = Math.max.apply(Math, array.map(function(o) { return o['valence']; }));
		const maxSData = Math.max.apply(Math, array.map(function(o) { return o['popularity']; }));
		
		const maxX = Math.max(maxXData, this.props.sliderValueDict['energy']);
		const maxY = Math.max(maxYData, this.props.sliderValueDict['danceability']);
		const maxC = Math.max(maxCData, this.props.sliderValueDict['happiness']);
		const maxS = Math.max(maxSData, this.props.sliderValueDict['popularity']);
		
		return [maxX, maxY, maxC, maxS]
	}
	
	findMin(array){
	
		
		const minXData = Math.min.apply(Math, array.map(function(o) { return o['energy']; }));
		const minYData = Math.min.apply(Math, array.map(function(o) { return o['danceability']; }));
		const minCData = Math.min.apply(Math, array.map(function(o) { return o['valence']; }));
		const minSData = Math.min.apply(Math, array.map(function(o) { return o['popularity']; }));
		
		
		const minX = Math.min(minXData, this.props.sliderValueDict['energy']);
		const minY = Math.min(minYData, this.props.sliderValueDict['danceability']);
		const minC = Math.min(minCData, this.props.sliderValueDict['happiness']);
		const minS = Math.min(minSData, this.props.sliderValueDict['popularity']);
		
		return [minX, minY, minC, minS]
	}
	
	
	drawTargets(width, height, xScale, yScale, margin){
		const danceabilityTarget = yScale(this.props.sliderValueDict['danceability']);
		const energyTarget = xScale(this.props.sliderValueDict['energy']);
		const targetsData = [
			{
				id: 1,
				x1: margin.left,
				x2: width + margin.left,
				y1: danceabilityTarget + margin.top,
				y2: danceabilityTarget + margin.top,
				color: this.props.colorDict['danceability'],
				value: Math.round(this.props.sliderValueDict['danceability'] * 100),
				xLabel: margin.left/2,
				yLabel: danceabilityTarget + margin.top
			},
			{
				id: 2,
				x1: energyTarget + margin.left,
				x2: energyTarget + margin.left,
				y1: margin.top,
				y2: margin.top + height,
				color: this.props.colorDict['energy'],
				value: Math.round(this.props.sliderValueDict['energy']*100),
				xLabel: energyTarget + margin.left,
				yLabel: margin.top + height + (margin.bottom / 2)
				
			}
		];
		if (! isNaN(danceabilityTarget) && !isNaN(energyTarget)){
			const svg = d3.select(this.refSVG.current);
			let targets = svg.selectAll('.targets')
				.data(targetsData, function (d) {
					return d.id
				});
			
			//update existing targets
			targets
				.attr('x1', function (d) {return d.x1})
				.attr('y1', function (d) {return d.y1})
				.attr('x2', function (d) {return d.x2})
				.attr('y2', function (d) {return d.y2})
				.style('stroke', function (d) {return d.color})
			;
			
			//init new targets
			targets
				.enter()
				.append('line')
				.attr('class', 'targets')
				.attr('x1', function (d) {
					return d.x1
				})
				.attr('y1', function (d) {
					return d.y1
				})
				.attr('x2', function (d) {
					return d.x2
				})
				.attr('y2', function (d) {
					return d.y2
				})
				.style('stroke', function (d) {
					return d.color
				})
			;
			
			let targetLabels = svg.selectAll('.targetLabels')
				.data(targetsData, function (d) {
					return d.id
				});
			
			targetLabels
				.attr('x', function (d) {
					return d.xLabel
				})
				.attr('y', function (d) {
					return d.yLabel
				})
				.text(function (d) {
					return d.value
				})
				.style('text-anchor', 'middle')
				.style('fill', "#ffffff");
			
			
			targetLabels
				.enter()
				.append('text')
				.attr('class', 'targetLabels')
				.attr('x', function (d) {
					return d.xLabel
				})
				.attr('y', function (d) {
					return d.yLabel
				})
				.text(function (d) {
					return d.value
				})
				.style('text-anchor', 'middle')
				.style('fill', "#ffffff")
			
			
		}
		
		
	}
	
	render(){
		const data = this.props.data;
		const [maxX, maxY, maxC, maxS] = this.findMax(data);
		const [minX, minY, minC, minS] = this.findMin(data);
		
		
		const margin = {top: 20, right: 20, bottom: 40, left:40};
		const width = 300 - margin.left - margin.right;
		const height = 300 - margin.top - margin.bottom;
		const svg = d3.select(this.refSVG.current);
		
		
		
		const xValue = function(d) { return d.energy;} // data -> value
		const xScale = d3.scaleLinear().range([0, width]) // value -> display
		const xMap = function(d) { return xScale(xValue(d)) + margin.left;}; // data -> display
		xScale.domain([minX, maxX]).nice();
		
		
		// setup y
		const yValue = function(d) { return d.danceability;} ;// data -> value
		const yScale = d3.scaleLinear().range([height, 0]); // value -> display
		const yMap = function(d) { return yScale(yValue(d)) + margin.top;}; // data -> display
		yScale.domain([minY, maxY]).nice();
	
		
		//set up radius
		var radius = d3.scaleSqrt()
			.range([2,10]);
		radius.domain([minS, maxS]).nice();
		
		//set up color
		//https://github.com/d3/d3-scale-chromatic
		var colorScale = d3.scaleSequential()
			.domain([minC, maxC])
			.interpolator(d3.interpolateYlGn);
		
		this.drawTargets(width, height, xScale, yScale, margin);
		
		
		var bubbles = svg.selectAll('.bubble')
			.data(data);
			
		bubbles
			.enter()
				.append('circle')
				.attr('class', 'bubble')
				.attr('cx', function(d){
					return xMap(d);
				})
				.attr('cy', function(d){ return yMap(d); })
				.attr('r', function(d){ return radius(d.popularity); })
				.style('fill', function(d){
					return colorScale(d.valence);
				});
		
		bubbles
			.exit()
				.remove();
		
		
			
		return (
			<svg
				ref={this.refSVG}
				width={width+margin.left + margin.right}
				height={height + margin.top + margin.bottom}
			/>
			
		);
	}
}