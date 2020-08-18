import React, {Component} from 'react';
import '../Styling/global.css';
import styles from '../Styling/ExplanationFull.module.css';
import classnames from 'classnames';


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
					<span>test2</span>
				</div>
				
			</div>
		)
	}
}

