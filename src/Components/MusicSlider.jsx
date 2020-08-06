import React, {Component} from 'react';

import { Slider, Rail, Handles, Tracks, Ticks } from "react-compound-slider";



import '../Styling/global.css'
import styles from '../Styling/MusicSlider.module.css';
import classnames from 'classnames'

export function Handle({handle: { id, value, percent }, getHandleProps}){
		return (
			<div
				style={{
					left: `${percent}%`,
					position: 'absolute',
					marginLeft: -15,
					marginTop: 25,
					zIndex: 2,
					width: 30,
					height: 30,
					border: 0,
					textAlign: 'center',
					cursor: 'pointer',
					borderRadius: '50%',
					backgroundColor: '#2C4870',
					color: '#333',
				}}
				{...getHandleProps(id)}
			>
				<div style={{ fontFamily: 'Roboto', fontSize: 11, marginTop: -35 }}>
					{value}
				</div>
			</div>
		)
	}

export function Track({ source, target, getTrackProps }) {
	return (
		<div
			style={{
				position: 'absolute',
				height: 10,
				zIndex: 1,
				marginTop: 35,
				backgroundColor: '#546C91',
				borderRadius: 5,
				cursor: 'pointer',
				left: `${source.percent}%`,
				width: `${target.percent - source.percent}%`,
			}}
			{...getTrackProps() /* this will set up events if you want it to be clickeable (optional) */}
		/>
	)
}



export default class MusicSlider extends Component{
	
	
	
	render(){
		const sliderStyle = {  // Give the slider some width
			position: 'relative',
			width: '100%',
			height: 80,
			border: '1px solid steelblue',
		};
		
		const railStyle = {
			position: 'absolute',
			width: '100%',
			height: 10,
			marginTop: 35,
			borderRadius: 5,
			backgroundColor: '#8B9CB6',
		};
		
		
		
		
		
		function thumbValue(props) {
			return (
				<span {...props}>
					{props["aria-valuenow"]}
        </span>
			);
		}
		
		
		
		return(
			<>
			<Slider
				vertical={false}
				rootStyle={sliderStyle}
				domain={[0, 100]}
				values={[50]}
			>
				<div style={railStyle /* Add a rail as a child.  Later we'll make it interactive. */} />
				<Handles>
					{({ handles, getHandleProps }) => (
						<div className="slider-handles">
							{handles.map(handle => (
								<Handle
									key={handle.id}
									handle={handle}
									getHandleProps={getHandleProps}
								/>
							))}
						</div>
					)}
				</Handles>
				<Tracks right={false}>
					{({ tracks, getTrackProps }) => (
						<div className="slider-tracks">
							{tracks.map(({ id, source, target }) => (
								<Track
									key={id}
									source={source}
									target={target}
									getTrackProps={getTrackProps}
								/>
							))}
						</div>
					)}
				</Tracks>
			</Slider>
			
			
			</>
		)
	}

}