import React, {Component} from 'react';
import '../Styling/global.css';
import styles from '../Styling/Tooltip.module.css';
import classnames from 'classnames';

export default class Tooltip extends Component{
	render(){
		const styleContainer = {
			position: "absolute",
			left: this.props.left,
			top: this.props.top,
		};
		
		
		
		const styleArtist = classnames(styles.song, styles.artist);
		const styleTitle = classnames(styles.song, styles.title);
		const styleBackground = classnames('container-rows', styles.background);
		return(
			<div
				className={styleBackground}
				style={styleContainer}
			>
				<div
					className={styleTitle}>
					{this.props.title}
				</div>
				<div
					className={styleArtist}
				>
					by {this.props.artist}
				</div>
			</div>
		)
	}
}