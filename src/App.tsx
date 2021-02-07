import React, { ReactElement } from 'react';
import './App.css';
import { NavLink } from 'react-router-dom';
import { History } from 'history';

type AppProps = {
	history: History;
};
type AppState = {
	selectionScreen: boolean;
};

export class App extends React.Component<AppProps, AppState> {
	constructor(props: AppProps) {
		super(props);
		this.state = {
			selectionScreen: true,
		};
	}

	public render(): ReactElement {
		return (
			<div className="App">
				<div>Circuit Trainer Timer</div>
				<div>
					<NavLink to="/select" exact={true}>
						Select Training
					</NavLink>
					<br />
					<NavLink to="/timer" exact={true}>
						Start
					</NavLink>
				</div>
			</div>
		);
	}
}
