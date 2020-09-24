import React, {Component} from 'react'
import '../Styling/global.css';
import * as d3 from 'd3';
import Tooltip from './Tooltip'
import {addInteraction} from "../Utils/API";





export default class Scatterplot extends Component{
	constructor(props){
		super(props);
		this.refSVG = React.createRef();
		this.state = {
			tooltip: false,
			xTooltip: 0,
			yTooltip : 0,
			titleTooltip : "",
			artistTooltip: "",
		}
	}
	
	componentDidMount(){
		this.initColorscale()
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
	
	initColorscale(){
		const svg = d3.select(this.refSVG.current);
		
		//append colorscale
		const svgDefs = svg.append('defs');
		const mainGradient = svgDefs
			.append('linearGradient')
			.attr('id', 'mainGradient')
			.attr("gradientTransform", 'rotate(90)')
		;
		mainGradient
			.append('stop')
			.attr('stop-color', '#78200A')
			.attr('offset', '0%');
		mainGradient
			.append('stop')
			.attr('stop-color', '#FF8A48')
			.attr('offset', '50%');
		mainGradient
			.append('stop')
			.attr('stop-color', '#FFE5CE')
			.attr('offset', '100%');
	}
	
	appendAxis(width, height, margin) {
		const data = [
			{
				id: 1,
				x: margin.left + (width / 2),
				y: margin.top + height + margin.bottom - 2,
				text: "Energy",
				fontSize: 10,
				fontWeight: 'bold',
				rotate: 0
			},
			{
				id: 2,
				x: margin.left / 2,
				y: margin.top + (height / 2),
				text: "Danceability",
				fontSize: 10,
				fontWeight: 'bold',
				rotate: -90
			}
		
		
		]
		
		const svg = d3.select(this.refSVG.current);
		let axisLabels = svg.selectAll('.axisLabels')
			.data(data, function (d) {
				return d.id
			});
		
		axisLabels
			.attr('x', function (d) {
				return d.x
			})
			.attr('y', function (d) {
				return d.y
			})
			.text(function (d) {
				return d.text
			})
			.style('text-anchor', "middle")
			.style('fill', "#ffffff")
			.style('font-size', function (d) {
				return d.fontSize
			})
			.style('font-weight', function (d) {
				return d.fontWeight
			})
			.attr('transform', function (d) {
				return "rotate(" + d.rotate + "," + d.x + "," + d.y + ")";
			})
		;
		
		axisLabels
			.enter()
			.append('text')
			.attr('class', 'axisLabels')
			.attr('x', function (d) {
				return d.x
			})
			.attr('y', function (d) {
				return d.y
			})
			.text(function (d) {
				return d.text
			})
			.style('text-anchor', "middle")
			.style('fill', "#ffffff")
			.style('font-size', function (d) {
				return d.fontSize
			})
			.style('font-weight', function (d) {
				return d.fontWeight
			})
			.attr('transform', function (d) {
				return "rotate(" + d.rotate + ")";
			})
	}
	
	drawLegendPopularity(width, height, margin, min, max){
		const xLegend = margin.left + width + (margin.right/2);
		const yLegendStart = margin.top + (height/2)
		const data = [
			{
				id: 1,
				x: xLegend,
				y: yLegendStart + 50,
				radius: 16},
			{
				id: 2,
				x: xLegend,
				y: yLegendStart + 85,
				radius: 12},
			{
				id: 3,
				x: xLegend,
				y: yLegendStart + 110,
				radius: 8},
			{
				id: 4,
				x: xLegend,
				y: yLegendStart + 130,
				radius: 4}
		];
		
		const svg = d3.select(this.refSVG.current);
		let legend = svg.selectAll('.legendPopularity')
			.data(data, function (d) {
				return d.id
			});
		
		//update existing targets
		legend
			.attr('cx', function (d) {return d.x})
			.attr('cy', function (d) {return d.y})
			.attr('r', function (d) {return d.radius})
			.style('stroke', "#ffffff")
			.style('stroke-width', '1px')
			.style('fill', '#1e1e1e')
		
		;
		
		legend
			.enter()
			.append('circle')
			.attr('class', 'legendPopularity')
			.attr('cx', function (d) {
				return d.x
			})
			.attr('cy', function (d) {
				return d.y
			})
			.attr('r', function (d) {
				return d.radius
			})
			.style('stroke', "#ffffff")
			.style('stroke-width', '1px')
			.style('fill', '#1e1e1e')
		
		const dataText = [
			{
				id: 1,
				text: 'Popularity',
				x: xLegend,
				y: yLegendStart + 20,
				fontSize: 12,
				fontWeight: 'bold'
			},
			{
				id: 2,
				text: max,
				x: xLegend,
				y: yLegendStart + 50,
				fontSize: 10,
				fontWeight: 'normal'
			},
			{
				id: 3,
				text: min,
				x: xLegend + 15,
				y: yLegendStart + 133,
				fontSize: 10,
				fontWeight: 'normal'
			},
			
		];
		
		let popularityLabels = svg.selectAll('.popularityLabels')
			.data(dataText, function (d) {
				return d.id
			});
		
		popularityLabels
			.attr('x', function (d) {
				return d.x
			})
			.attr('y', function (d) {
				return d.y
			})
			.text(function (d) {
				return d.text
			})
			.style('text-anchor', 'middle')
			.style('fill', "#ffffff")
			.style('font-size', function (d) {return d.fontSize})
			.style('font-weight', function (d) {return d.fontWeight})
		
		;
		
		
		popularityLabels
			.enter()
			.append('text')
			.attr('class', 'popularityLabels')
			.attr('x', function (d) {
				return d.x
			})
			.attr('y', function (d) {
				return d.y
			})
			.text(function (d) {
				return d.text
			})
			.style('text-anchor', 'middle')
			.style('fill', "#ffffff")
			.style('font-size', function (d) {
				return d.fontSize
			})
	}
	
	drawLegendHappiness(width, margin, min, max){
		const svg = d3.select(this.refSVG.current);
		
		const widthRect = 14;
		const heightRect = 100;
		
		const xLegend = margin.left + width + (margin.right/2) - (widthRect/2);
		const yLegendStart = margin.top + 10;
		const marginTitle = 20;
		const marginLabel = 2;
		
		
		
		
		const data=[
			{
				id: 1,
				x: xLegend,
				y: yLegendStart + marginTitle
			}
		];
		let legend = svg.selectAll('.legendHappiness')
			.data(data, function (d) {
				return d.id
			});
		
		
		
		//update existing
		legend
			.attr('x', function (d) {return d.x})
			.attr('y', function (d) {return d.y})
			.attr('width', widthRect)
			.attr('height', heightRect)
			.style('stroke', "#ffffff")
			.style('stroke-width', '1px')
			.style('fill', 'url(#mainGradient)')
		
		;
		
		legend
			.enter()
			.append('rect')
			.attr('class', 'legendHappiness')
			.attr('x', function (d) {return d.x})
			.attr('y', function (d) {return d.y})
			.attr('width', widthRect)
			.attr('height', heightRect)
			.style('stroke', "#ffffff")
			.style('stroke-width', '1px')
			.style('fill', 'url(#mainGradient)')
		
		const dataText = [
			{
				id: 7,
				text: 'Happiness',
				x: margin.left + width + (margin.right/2),
				y: yLegendStart + marginTitle/2,
				fontSize: 12,
				anchor: 'middle',
				fontWeight: 'bold'
			},
			{
				id: 8,
				text: max,
				x: xLegend + widthRect + marginLabel,
				y: yLegendStart + marginTitle + 10,
				fontSize: 10,
				anchor: 'left',
				fontWeight: 'normal'
			},
			{
				id: 9,
				text: min,
				x: xLegend + widthRect + marginLabel,
				y: yLegendStart + marginTitle + heightRect ,
				fontSize: 10,
				anchor: 'left',
				fontWeight: 'normal'
			},
		]
		
		let happinessLabels = svg.selectAll('.happinessLabels')
			.data(dataText, function (d) {
				return d.id
			});
		
		happinessLabels
			.attr('x', function (d) {return d.x})
			.attr('y', function (d) {return d.y})
			.text(function (d) {return d.text})
			.style('text-anchor', function (d) {return d.anchor})
			.style('fill', "#ffffff")
			.style('font-size', function (d) {return d.fontSize})
			.style('font-weight', function (d) {return d.fontWeight})
		;
		
		happinessLabels
			.enter()
			.append('text')
			.attr('class', 'happinessLabels')
			.attr('x', function (d) {return d.x})
			.attr('y', function (d) {return d.y})
			.text(function (d) {return d.text})
			.style('text-anchor', function (d) {return d.anchor})
			.style('fill', "#ffffff")
			.style('font-size', function (d) {return d.fontSize})
			.style('font-weight', function (d) {return d.fontWeight})
		
		
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
				xLabel: margin.left - 10,
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
				.style('fill', "#ffffff")
				.style('font-size', '12px')
			;
			
			
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
		let component = this;
		const data = this.props.data;
		const [maxX, maxY, maxC, maxS] = this.findMax(data);
		const [minX, minY, minC, minS] = this.findMin(data);
		
		
		const margin = {top: 0, right: 100, bottom: 40, left: 50};
		const width = 350 - margin.left - margin.right;
		const height = 350 - margin.top - margin.bottom;
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
			.range([4,16]);
		radius.domain([minS, maxS]).nice();
		
		//set up color
		//https://github.com/d3/d3-scale-chromatic
		// https://observablehq.com/@d3/working-with-color
		var colorScale = d3.scaleSequential()
			.domain([minC, maxC])
			.interpolator(d3.interpolateOranges);
		
		this.drawTargets(width, height, xScale, yScale, margin);
		this.drawLegendPopularity(width, height, margin, minS, maxS);
		this.drawLegendHappiness(width, margin, Math.round(minC *100), Math.round(maxC *100));
		this.appendAxis(width, height, margin);
		
		let mouseOver = function(d){
			d3.select(this)
				.style('opacity',1)
				.style('stroke', '#fff')
				.style('stroke-width', '1px');
			
			component.setState({
				tooltip: true,
				titleTooltip: d.name,
				artistTooltip: d.artists[0].name,
				xTooltip: (d3.event.pageX + 10) + "px",
				yTooltip: d3.event.pageY + "px",
			});
		}
		
		
		let mouseout = function(d) {
			const userId = localStorage.getItem('userId');
			const nfc = localStorage.getItem('nfc');
			const versionUI = localStorage.getItem('version');
			addInteraction(userId, nfc, versionUI, 'scatterplot', 'hover', 1);
			d3.select(this)
				.style('opacity',0.5)
				.style('stroke', 'none')
			component.setState(
				{tooltip: false}
			)
		};
		
		const bubbles = svg.selectAll('.bubble')
			.data(data);
		
		bubbles
			.enter()
			.append('circle')
			.attr('class', 'bubble')
			.attr('cx', function(d){return xMap(d);})
			.attr('cy', function(d){ return yMap(d); })
			.attr('r', function(d){ return radius(d.popularity); })
			.style('fill', function(d){return colorScale(d.valence);})
			.style('opacity', 0.5 )
			.on('mouseover', mouseOver)
			.on('mouseout', mouseout)
		
		;
		
		bubbles
			.exit()
			.remove();
		
		
			
		return (
			<>
				<svg
					ref={this.refSVG}
					width={width+margin.left + margin.right}
					height={height + margin.top + margin.bottom}
				/>
			{this.state.tooltip ?
				<Tooltip
					left = {this.state.xTooltip}
					top = {this.state.yTooltip}
					title = {this.state.titleTooltip}
					artist = {this.state.artistTooltip}
				/>
				: null }
			</>
			
		);
	}
}