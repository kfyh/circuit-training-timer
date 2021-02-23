import React, { ReactElement } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ConnectedSelector, ConnectedCircuitTimer, ConnectedDashboard } from '../components/index';

export const AppRouter = (): ReactElement => (
	<BrowserRouter>
		<div>
			<Switch>
				<Route path="/" exact={true} component={ConnectedDashboard} />
				<Route path="/select" exact={true} component={ConnectedSelector} />
				<Route path="/timer" exact={true} component={ConnectedCircuitTimer} />
			</Switch>
		</div>
	</BrowserRouter>
);
