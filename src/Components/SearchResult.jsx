import React, {Component} from 'react';

import styles from '../Styling/PlaylistSong.module.css';
import '../Styling/global.css'
import classnames from 'classnames'
import ReactTooltip from "react-tooltip";

import deleteFromPlaylist from '../Images/delete.svg'
import source from '../Images/source.svg'
import sourceGrey from '../Images/source-grey.svg'


export default class SearchResult extends Component{
	
	constructor(props){
		super(props);
		
	}
	
	
	render(){
		
		return(
			<div>
				{this.props.id}
			</div>
		)
		
	}
	
	
}