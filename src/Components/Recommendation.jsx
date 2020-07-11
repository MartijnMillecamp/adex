import React, {Component} from 'react'
import SongInfo from './SongInfo'

export default class Recommendation extends Component{
	
	constructor(props){
		super(props)
	}
	
	render(){
		return(
			<>
			<SongInfo key={this.props.id} title={this.props.title} artist={this.props.artist}/>
			</>
		)
	
	}
	
	
}

