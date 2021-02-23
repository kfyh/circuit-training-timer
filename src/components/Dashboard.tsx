import React, { ReactElement } from 'react';
import { connect } from 'react-redux';
import { ISelectorAction, ISelectorReducerState } from '../reducers';
import { Circuit } from '../types/circuits';
import { Dispatch } from 'redux';
import { selectCircuit } from '../actions/selectorActions';
import { CircuitView } from './selector/CircuitView';
import { History } from 'history';

type DashboardProps = {
	circuits: Array<Circuit>;
	history: History;
	selectCircuit: (circuit: Circuit) => void;
};

type DashboardState = {
	currentIndex: number;
	hasStarted: boolean;
	isRunning: boolean;
	endTime: number;
	timeLeft: number;
};

export class Dashboard extends React.Component<DashboardProps, {}> {
	constructor(props: DashboardProps) {
		super(props);

		this.state = {
			currentIndex: 0,
			hasStarted: false,
			isRunning: false,
			endTime: 0,
			timeLeft: 0,
		};
	}

	private onClick = (circuit: Circuit) => {
		selectCircuit(circuit);
		this.props.history.push('/timer');
	};

	public render(): ReactElement {
		return (
			<div>
				<p>Dashboard</p>
				{this.props.circuits.map((circuit) => {
					return <CircuitView key={circuit.id} circuit={circuit} onClick={this.onClick} />;
				})}
			</div>
		);
	}
}

const mapStateToProps = (state: ISelectorReducerState) => {
	return {
		circuits: state.circuits,
	};
};

const mapDispatchToProps = (dispatch: Dispatch<ISelectorAction>) => ({
	selectCircuit: (circuit: Circuit) => dispatch(selectCircuit(circuit)),
});

export const ConnectedDashboard = connect(mapStateToProps, mapDispatchToProps)(Dashboard);
