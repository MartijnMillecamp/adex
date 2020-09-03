import React, { Component}  from 'react';
import styles from '../Styling/SearchField.module.css';


export default class SearchField extends Component{
	constructor(props){
		super(props);
		this.searchClick = this.searchClick.bind(this);
		this.stopSearch = this.stopSearch.bind(this);
		this.handleTyping = this.handleTyping.bind(this);
		this.search = this.search.bind(this);
		this.state = {
			query : "",
		}
	}
	
	static getDerivedStateFromProps(props, state) {
		if (!props.active){
			return {query: ""}
		}
		else{
			return {query: state.query}
		}
	}
	
	searchClick(){
		this.props.handlerSearchClick()
	}
	
	stopSearch(){
		if(this.props.results.length === 0 || this.query === ""){
			this.props.handlerStopSearch()
		}
	}
	
	search(event){
		if (event.charCode === 13) {
			const query = event.target.value;
			this.setState({ query: query });
			this.props.handlerSearch(query)
		}
	}
	
	handleTyping(event){
		this.setState({query: event.target.value})
	}
	
	
	
	
	
	render(){
		return(
			<input
				type="text"
				className={styles.SearchField}
				placeholder="Search..."
				onFocus={this.searchClick}
				onBlur={this.stopSearch}
				onKeyPress={this.search}
				value={this.state.query}
				onChange={this.handleTyping}
			
			/>
		)
	}
}