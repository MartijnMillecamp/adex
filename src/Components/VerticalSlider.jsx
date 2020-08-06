import React, { Component } from 'react'
import Slider, { Rail, Handles, Tracks, Ticks } from 'react-compound-slider'
import { SliderRail, Handle, Track, Tick } from './CompoundSliderUtils'



const domain = [0, 100];
const defaultValues = [50];

class VerticalSlider extends Component {
	state = {
		values: defaultValues.slice(),
		update: defaultValues.slice(),
	};
	
	onUpdate = update => {
		this.setState({ update })
	};
	
	onChange = values => {
		this.setState({ values })
	};
	
	render() {
		const {
			state: { values, update },
		} = this;
		
		const containerStyle = {
			height: '100%',
			width: '25%'
		};
		
		const sliderStyle = {
			position: 'relative',
			height: '100%',
			touchAction: 'none',
		};
		
		
		
		return (
			<div style={containerStyle}>
				<Slider
					vertical
					reversed
					mode={2}
					step={1}
					domain={domain}
					rootStyle={sliderStyle}
					onUpdate={this.onUpdate}
					onChange={this.onChange}
					values={values}
				>
					<Rail>
						{({ getRailProps }) => <SliderRail getRailProps={getRailProps} />}
					</Rail>
					
					<Handles>
						{({ handles, getHandleProps }) => (
							<div className="slider-handles">
								{handles.map(handle => (
									<Handle
										key={handle.id}
										handle={handle}
										domain={domain}
										getHandleProps={getHandleProps}
										color={this.props.color}
									/>
								))}
							</div>
						)}
					</Handles>
					<Tracks left={false} right={true}>
						{({ tracks, getTrackProps }) => (
							<div className="slider-tracks">
								{tracks.map(({ id, source, target }) => (
									<Track
										key={id}
										source={source}
										target={target}
										getTrackProps={getTrackProps}
										color={this.props.color}
									/>
								))}
							</div>
						)}
					</Tracks>
				</Slider>
			</div>
		)
	}
}

export default VerticalSlider