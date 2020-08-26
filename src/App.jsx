import React, {Component} from 'react';
import Login from './Screens/Login'

import {BrowserRouter as Router, Switch, Route,} from "react-router-dom";
import Home from './Screens/Home'
import Export from "./Screens/Export";

export default function App() {
	return (
		<Router>
				<Switch>
					<Route path="/Home" component={Home}/>
					<Route path="/Export">
						<Export />
					</Route>
					<Route path="/" component={Login}/>
				</Switch>
		</Router>
	);
}



