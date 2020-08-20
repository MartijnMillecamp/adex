import React, {Component} from 'react';
import styles from '../Styling/ExportSong.module.css';
import '../Styling/global.css'
import classnames from 'classnames'

export default class ExportSong extends Component{
	render(){
		const styleArtist = classnames(styles.song, styles.artist);
		const styleTitle = classnames(styles.song, styles.title);
		const styleBackground = classnames('container-rows', styles.background);
		return(
			<div className={styleBackground}>
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

