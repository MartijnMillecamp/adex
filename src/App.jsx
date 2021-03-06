import React from 'react';

import {BrowserRouter as Router, Switch, Route,} from "react-router-dom";
import Welcome from "./Screens/Welcome"
import Protocol from "./Screens/Protocol"
import NFC from "./Screens/NFC"
import MS from "./Screens/MS"
import Openness from "./Screens/Openness"
import Login from './Screens/Login'
import InfoSliders from "./Screens/InfoSliders"
import InfoExplanations from "./Screens/InfoExplanations";
import InfoExplanationsSimple from "./Screens/InfoExplanationsSimple";

import InfoSources from "./Screens/InfoSources";
import Home from './Screens/Home'
import Export from "./Screens/Export";
import Posttask from "./Screens/Posttask";
import FinalOpenness from "./Screens/FinalOpenness";
import Thanks from "./Screens/Thanks";
import Error from "./Screens/Error";





export default function App() {
	return (
		<Router>
				<Switch>
					<Route path="/Protocol" component={Protocol}/>
					<Route path="/NFC" component={NFC}/>
					<Route path="/MS" component={MS}/>
					<Route path="/Openness" component={Openness}/>
					<Route path="/Login" component={Login}/>
					<Route path="/InfoSliders" component={InfoSliders}/>
					<Route path="/InfoExplanations" component={InfoExplanations}/>
					<Route path="/InfoExplanationsSimple" component={InfoExplanationsSimple}/>
					<Route path="/InfoSources" component={InfoSources}/>
					<Route path="/Home" component={Home}/>
					<Route path="/Export" component={Export} />
					<Route path="/Posttask" component={Posttask} />
					<Route path="/Final" component={FinalOpenness} />
					<Route path="/Thanks" component={Thanks} />
					<Route path="/" component={Login}/>
				
				</Switch>
		</Router>
	);
}



