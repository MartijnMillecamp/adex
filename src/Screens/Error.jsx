import React, {Component} from 'react';
import '../Styling/global.css'
import styles from '../Styling/Error.module.css'


export default class Error extends Component{
	
	render(){
		const styleErrorContainer = styles.container;
		const userId = localStorage.getItem('userId');
		const error = this.props.location.state.error;
		
		return(
			<>
			<div
				className={styleErrorContainer}
			>
				<h1>Error</h1>
				<h2>
					Something went wrong :(
				</h2>
				<p>Please try again with a different browser (Firefox, Safari, Chrome)</p>
				<p>Or send an email to martijn.millecamp@cs.kuleuven.be with as subject [ User: {userId}, Error: {error} ].</p>
			
			</div>
			
			</>
		
		)
	}
	
}