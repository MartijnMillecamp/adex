import React, {Component} from 'react';
import Login from './Screens/Login'

import {BrowserRouter as Router, Switch, Route,} from "react-router-dom";
import Home from './Screens/Home'
import Export from "./Screens/Export";
import NFC from "./Screens/NFC"

export default function App() {
	return (
		<Router>
				<Switch>
					<Route path="/Home" component={Home}/>
					<Route path="/Export" component={Export} />
					<Route path="/Login" component={Login}/>
					<Route path="/NFC" component={NFC}/>
					<Route path="/" component={Login}/>
				</Switch>
		</Router>
	);
}



