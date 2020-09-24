import React, { Component } from 'react'
import Slider, { Rail, Handles, Tracks} from 'react-compound-slider'
import { SliderRail, Handle, Track} from './CompoundSliderUtils'
import styles from '../Styling/VerticalSlider.module.css'
import classnames from 'classnames'

import '../Styling/global.css'



const domain = [0, 100];

class VerticalSlider extends Component {
	

	
	onChange = values => {
		const value = values[0];
		this.props.handlerSliderChange(value, this.props.feature);
		this.props.handlerLogging('changeSlider', this.props.feature, value);
	};
	
	render() {
		const values = this.props.values;
		
		const styleContainerMusicSlider = classnames('container-rows', styles.container);
		const styleSliderIcon = classnames(styles.icon)
		const styleSlider = classnames(styles.slider);
		
		return (
			<div className={styleContainerMusicSlider}>
				<img
					src={this.props.icon}
					className = {styleSliderIcon}
					alt={"icon"}
				/>
				<Slider
					className={styleSlider}
					vertical
					reversed
					mode={2}
					step={1}
					domain={domain}
					// rootStyle={styleSlider}
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