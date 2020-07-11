import React, { Component } from 'react'

export default class SongInfo extends Component{
	
	render(){
		return(
			<>
			<div>
				<div className="song title">{this.props.title}</div>
				<div className="song artist">{this.props.artist}</div>
			</div>
			</>
			)
		
	}
	
	
}

