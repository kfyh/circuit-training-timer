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

export class Dashboard extends React.Component<DashboardProps, Record<string, never>> {
	constructor(props: DashboardProps) {
		super(props);
	}

	private onClick = (circuit: Circuit) => {
		this.props.selectCircuit(circuit);
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
