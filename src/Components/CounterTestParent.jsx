import React, {Component} from 'react'
import CounterTest from '../Components/CounterTest'

export default class CounterTestParent extends Component {
	
	constructor(props){
		super(props);
		this.state = {
			counterTest: 0
		};
		this.handler = this.handler.bind(this);
		this.handlerVar = this.handlerVar.bind(this);
		
	}
	
	handler() {
		let counter = this.state.counterTest;
		this.setState({
			counterTest: counter + 1
		});
	}
	
	handlerVar(num) {
		let counter = this.state.counterTest;
		this.setState({
			counterTest: counter + num
		});
	}
	
	render() {
		
		return (
			<>
			<p>{this.state.counterTest}</p>
			<CounterTest
				counterTest = {this.state.counterTest}
				handleCounter = {this.handlerVar}
			/>
			</>
		)
	}
	
	
}