import React, { ReactElement } from 'react';
import './App.css';
import { NavLink } from 'react-router-dom';
import { Selector, CircuitTimer } from './components/index';
import { History } from 'history';

type AppProps = {
	history: History;
};
type AppState = {
	selectionScreen: boolean;
};

export class App extends React.Component<AppProps, AppState> {
	private intervals: object[];

	constructor(props: AppProps) {
		super(props);

		this.intervals = [
			{ label: 'Burpies', time: 5, reps: 3, type: 'exercise' },
			{
				label: 'Finger Training',
				time: 10,
				reps: 7,
				type: 'set',
				steps: [
					{ label: 'Hang for 7 secs', time: 7, reps: 1, type: 'exercise' },
					{ label: 'Break and Recover', time: 3, reps: 1, type: 'break' },
				],
			},
			{ label: 'Finished', time: 5, reps: 1, type: 'prep' },
		];
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
					<br/>
					<NavLink to="/timer" exact={true}>
						Start
					</NavLink>
				</div>
			</div>
		);
	}
}
