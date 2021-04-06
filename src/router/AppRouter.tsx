import React, { ReactElement } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import {
	ConnectedCircuitTimer,
	ConnectedDashboard,
	ConnectedAddExercisePage,
	ConnectedEditExercisePage,
	ConnectedAddCircuitPage,
	ConnectedEditCircuitPage,
} from '../components/index';

export const AppRouter = (): ReactElement => (
	<BrowserRouter>
		<div>
			<Switch>
				<Route path="/" exact={true} component={ConnectedDashboard} />
				<Route path="/addcircuit" exact={true} component={ConnectedAddCircuitPage} />
				<Route path="/editcircuit/:id" exact={true} component={ConnectedEditCircuitPage} />
				<Route path="/addexercise" exact={true} component={ConnectedAddExercisePage} />
				<Route path="/editexercise/:id" exact={true} component={ConnectedEditExercisePage} />
				<Route path="/timer/:id" exact={true} component={ConnectedCircuitTimer} />
			</Switch>
		</div>
	</BrowserRouter>
);
