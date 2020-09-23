import React, {Component} from 'react';
import Login from './Screens/Login'

import {BrowserRouter as Router, Switch, Route,} from "react-router-dom";
import Home from './Screens/Home'
import Export from "./Screens/Export";
import NFC from "./Screens/NFC"
import Welcome from "./Screens/Welcome"
import Protocol from "./Screens/Protocol"
import InfoSliders from "./Screens/InfoSliders"
import InfoExplanations from "./Screens/InfoExplanations";
import Posttask from "./Screens/Posttask";
import Final from "./Screens/Final";
import Thanks from "./Screens/Thanks";




export default function App() {
	return (
		<Router>
				<Switch>
					<Route path="/Protocol" component={Protocol}/>
					<Route path="/NFC" component={NFC}/>
					<Route path="/Login" component={Login}/>
					<Route path="/InfoSliders" component={InfoSliders}/>
					<Route path="/InfoExplanations" component={InfoExplanations}/>
					<Route path="/Home" component={Home}/>
					<Route path="/Export" component={Export} />
					<Route path="/Posttask" component={Posttask} />
					<Route path="/Final" component={Final} />
					<Route path="/Thanks" component={Thanks} />
					
					
					
					<Route path="/" component={Welcome}/>
				
				</Switch>
		</Router>
	);
}



