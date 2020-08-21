import CanvasJSReact from '../assets/canvasjs.react';
import React, {Component} from 'react'
import '../Styling/global.css';
import styles from '../Styling/Scatterplot.module.css';
import classnames from 'classnames';

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;


export default class Scatterplot extends Component{
	
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
		const dataPoints = this.parseData();
		const [maxX, maxY, maxZ] = this.findMax(dataPoints);
		const [minX, minY, minZ] = this.findMin(dataPoints);
		const maxRadius = 5;
		{
			const options = {
				animationEnabled: true,
				exportEnabled: false,
				theme: "dark2", // "light1", "light2", "dark1", "dark2"
				title:{},
				axisX: {
					title: "Energy",
					minimum: minX - maxRadius,
					maximum: maxX + maxRadius,
				},
				axisY: {
					title: "Danceability",
					minimum: minY - maxRadius,
					maximum: maxY + maxRadius,
				},
				data: [{
					type: "bubble",
					indexLabel: "{label}",
					toolTipContent: "<b>{title}</b><br>by {artist}<br>",
					dataPoints: dataPoints
				}]
			};

			return (
				<div>
					<CanvasJSChart options = {options}
						/* onRef = {ref => this.chart = ref} */
					/>
				</div>
			);
		}
		
	}
}