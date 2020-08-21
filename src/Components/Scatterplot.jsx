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
		const maxX = Math.max.apply(Math, array.map(function(o) { return o.x; }));
		const maxY = Math.max.apply(Math, array.map(function(o) { return o.y; }));
		const maxZ = Math.max.apply(Math, array.map(function(o) { return o.z; }));
		return [maxX, maxY, maxZ]
	}
	
	findMin(array){
		const minX = Math.min.apply(Math, array.map(function(o) { return o.x; }));
		const minY = Math.min.apply(Math, array.map(function(o) { return o.y; }));
		const minZ = Math.min.apply(Math, array.map(function(o) { return o.z; }));
		return [minX, minY, minZ]
	}
	
	parseData(){
		let parsed = this.props.data.map(song =>
			({title: song.name,
				artist: song.artists[0].name,
				x: Math.round(song.energy * 100),
				y: Math.round(song.danceability * 100),
				z: Math.round(song.popularity/10)
			})
		);
		return parsed
	}
	
	render(){
		const data = this.props.data;
		
		const margin = {top: 30, right: 50, bottom: 40, left:40};
		const width = 300 - margin.left - margin.right;
		const height = 300 - margin.top - margin.bottom;
		
		const svg = d3.select(this.refSVG.current);
		
		// setup x
		const xValue = function(d) { return d.energy;}, // data -> value
			xScale = d3.scaleLinear().range([0, width]), // value -> display
			xMap = function(d) { return xScale(xValue(d));}, // data -> display
			xAxis = d3.axisBottom().scale(xScale)
			xAxis.ticks([this.props.sliderValueDict['energy']])
		
		
		// setup y
		const yValue = function(d) { return d.danceability;}, // data -> value
			yScale = d3.scaleLinear().range([height, 0]), // value -> display
			yMap = function(d) { return yScale(yValue(d));}, // data -> display
			yAxis = d3.axisLeft().scale(yScale);
			yAxis.ticks([this.props.sliderValueDict['danceability']])
		
		//set up radius
		var radius = d3.scaleSqrt()
			.range([2,10]);
		
		//set up color
		//https://github.com/d3/d3-scale-chromatic
		var colorScale = d3.scaleSequential()
			.domain([0, 1])
			.interpolator(d3.interpolateYlGn);
		
		xScale.domain(d3.extent(data, function(d){
			return d.energy;
		})).nice();
		
		yScale.domain(d3.extent(data, function(d){
			return d.danceability;
		})).nice();
		
		radius.domain(d3.extent(data, function(d){
			return d.popularity;
		})).nice();
		
		// adding axes is also simpler now, just translate x-axis to (0,height) and it's alread defined to be a bottom axis.
		svg.append('g')
			.attr('transform', 'translate(0,' + height + ')')
			.attr('class', styles.axis)
			.call(xAxis);
		
		// y-axis is translated to (0,0)
		svg.append('g')
			.attr('transform', 'translate(0,0)')
			.attr('class', styles.axis)
			.call(yAxis);
		
		
		var bubble = svg.selectAll('.bubble')
			.data(data)
			.enter().append('circle')
			.attr('class', 'bubble')
			.attr('cx', function(d){
				return xMap(d);
			})
			.attr('cy', function(d){ return yMap(d); })
			.attr('r', function(d){ return radius(d.popularity); })
			.style('fill', function(d){
				// console.log(d.valence, colorScale(d.valence));
				return colorScale(d.valence);
			});
		
			
		return (
			<svg
				ref={this.refSVG}
				width={width+margin.left + margin.right}
				height={height + margin.top + margin.bottom}
			/>
			
		);
	}
}