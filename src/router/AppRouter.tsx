import React, { ReactElement } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ConnectedCreateCircuitView } from '../components/creator/CreateCircuitView';
import { ConnectedCircuitTimer, ConnectedDashboard, ConnectedAddExercisePage } from '../components/index';

export const AppRouter = (): ReactElement => (
	<BrowserRouter>
		<div>
			<Switch>
				<Route path="/" exact={true} component={ConnectedDashboard} />
				<Route path="/addexercise" exact={true} component={ConnectedAddExercisePage} />
				<Route path="/addcircuit" exact={true} component={ConnectedCreateCircuitView} />
				<Route path="/timer" exact={true} component={ConnectedCircuitTimer} />
			</Switch>
		</div>
	</BrowserRouter>
);
