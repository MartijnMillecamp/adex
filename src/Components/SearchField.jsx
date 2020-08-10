import React, { Component}  from 'react';
import styles from '../Styling/SearchField.module.css';


export default class SearchField extends Component{
	constructor(props){
		super(props);
		this.searchClick = this.searchClick.bind(this);
		this.search = this.search.bind(this)
		this.state = {
			query : ""
		}
	}
	
	searchClick(){
		this.props.handlerSearchClick()
		
	}
	
	search(event){
		if (event.charCode === 13) {
			const query = event.target.value;
			this.setState({ query: query });
			this.props.handlerSearch(query)
		}
	}
	
	
	render(){
		return(
			<input
				type="search"
				placeholder={
					this.props.active ? " " : "Search..."
				}
				className = {styles.SearchField}
				onClick={this.searchClick}
				onKeyPress={this.search}
			/>
		)
	}
}