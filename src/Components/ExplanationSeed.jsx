import React, {Component} from 'react';
import '../Styling/global.css';
import styles from '../Styling/ExplanationSeed.module.css';
import classnames from 'classnames';

import Album from './Album'


export default class ExplanationSeed extends Component{
	render(){
		const styleText = classnames(styles.text)
		return(
			<>
				<Album
					key={"album_exp_seed_" + this.props.id}
					id={this.props.seedId}
					album={this.props.seedAlbum}
					preview_url={null}
					
					style = {'explSeed'}
					playable = {false}
				
				/>
				<div className={styleText}>
					This song is recommended because it is similar to <b>{this.props.seedTitle}</b>
				</div>
			</>
		)
	}
}