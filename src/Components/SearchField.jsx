import React, { Component}  from 'react';
import styles from '../Styling/SearchField.module.css';


export default class SearchField extends Component{
	constructor(props){
		super(props);
		this.searchClick = this.searchClick.bind(this);
		this.handleTyping = this.handleTyping.bind(this);
		this.search = this.search.bind(this)
		this.state = {
			query : "",
			active: this.props.active
		}
	}
	
	static getDerivedStateFromProps(props, state) {
		if (props.active){
			return {active: props.active}
		}
		else{
			return {
				active: props.active,
				query: ""
			}
		}
		//important to change to blank input again
		return{
			active: props.active
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
	
	handleTyping(event){
		this.setState({query: event.target.value})
	}
	
	
	
	render(){
		return(
			<input
				type="text"
				className={styles.SearchField}
				placeholder="Search..."
				onClick={this.searchClick}
				onKeyPress={this.search}
				value={this.state.query}
				onChange={this.handleTyping}
			
			/>
		)
	}
}