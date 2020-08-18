import React, {Component} from 'react';
import '../Styling/global.css';
import styles from '../Styling/ExplanationFull.module.css';
import classnames from 'classnames';
import ExplanationSeed from "./ExplanationSeed";


export default class ExplanationFull extends Component{
	render(){
		const styleContainer=classnames('container-rows', styles.containerAll);
		const styleContainerRow1=classnames('container-columns', styles.containerRow1);
		const styleContainerRow2=classnames('container-columns', styles.containerRow2);
		
		return (
			<div className={styleContainer}>
				<div className={styleContainerRow1}>
					<span>test</span>
					<span>test</span>
				</div>
				<div className={styleContainerRow2}>
					<ExplanationSeed
						key={"exp_seed_" + this.props.id}
						seedId={this.props.seedId}
						seedTitle={this.props.seedTitle}
						seedArtist={this.props.seedArtist}
						seedAlbum={this.props.seedAlbum}
						seedPreview_url={this.props.seedPreview_url}
					
					/>
				</div>
				
			</div>
		)
	}
}

