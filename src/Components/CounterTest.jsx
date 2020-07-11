import React, { Component } from 'react';
//https://ourcodeworld.com/articles/read/409/how-to-update-parent-state-from-child-component-in-react

export default class CounterTest extends Component {
	
	render() {
		return (
			<>
				<button onClick={() => this.props.handleCounter(5)}>"Count"</button>
			</>
		)
	}
}