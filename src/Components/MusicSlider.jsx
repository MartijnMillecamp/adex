import React, {Component} from 'react';
import VerticalSlider from './VerticalSlider'

import '../Styling/global.css'
import styles from '../Styling/VerticalSlider.module.css';
import classnames from 'classnames'


export default class MusicSlider extends Component{
	
	
	
	render(){
		
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