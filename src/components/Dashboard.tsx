import React, { ReactElement } from 'react';
import { connect } from 'react-redux';
import { ISelectorAction, ISelectorReducerState } from '../reducers';
import { Circuit, Exercise } from '../types/circuits';
import { Dispatch } from 'redux';
import { selectCircuit } from '../actions/selectorActions';
import { CircuitListView, ExerciseListView } from './selector/';
import { History } from 'history';
import { NavLink } from 'react-router-dom';

type DashboardProps = {
	exercises: Array<Exercise>;
	circuits: Array<Circuit>;
	history: History;
	selectCircuit: (circuit: Circuit) => void;
};

export class Dashboard extends React.Component<DashboardProps, Record<string, never>> {
	constructor(props: DashboardProps) {
		super(props);
	}

	private onCircuitClicked = (circuit: Circuit) => {
		this.props.selectCircuit(circuit);
		this.props.history.push('/timer');
	};

	private onExerciseClicked = () => {
		
	};

	public render(): ReactElement {
		return (
			<div>
				<p>Dashboard</p>
				<a>New Circuit</a>
				<NavLink to="/addexercise" exact={true}>
					Add Exercise
				</NavLink>
				<CircuitListView circuits={this.props.circuits} onSelect={this.onCircuitClicked} />
				<ExerciseListView exercises={this.props.exercises} onSelect={this.onExerciseClicked} />
			</div>
		);
	}
}

const mapStateToProps = (state: ISelectorReducerState) => {
	return {
		circuits: state.circuits,
		exercises: state.exercises,
	};
};

const mapDispatchToProps = (dispatch: Dispatch<ISelectorAction>) => ({
	selectCircuit: (circuit: Circuit) => dispatch(selectCircuit(circuit)),
});

export const ConnectedDashboard = connect(mapStateToProps, mapDispatchToProps)(Dashboard);
