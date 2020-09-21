import React, {Component} from 'react';
import Login from './Screens/Login'

import {BrowserRouter as Router, Switch, Route,} from "react-router-dom";
import Home from './Screens/Home'
import Export from "./Screens/Export";
import NFC from "./Screens/NFC"
import Welcome from "./Screens/Welcome"
import Protocol from "./Screens/Protocol"

export default function App() {
	return (
		<Router>
				<Switch>
					<Route path="/Protocol" component={Protocol}/>
					<Route path="/Home" component={Home}/>
					<Route path="/Export" component={Export} />
					<Route path="/Login" component={Login}/>
					<Route path="/NFC" component={NFC}/>
					<Route path="/" component={Welcome}/>
				
				</Switch>
		</Router>
	);
}



