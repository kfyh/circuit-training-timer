import React, { ReactElement } from 'react';
import { connect } from 'react-redux';
import { ISelectorAction, ISelectorReducerState } from '../reducers';
import { Circuit, Exercise } from '../types/circuits';
import { Dispatch } from 'redux';
import { selectCircuit } from '../actions/selectorActions';
import { CircuitListView, ExerciseListView } from './selector/';
import { History } from 'history';
import { Link } from 'react-router-dom';

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
		this.props.history.push(`/timer/${circuit.id}`);
	};

	private onExerciseClicked = () => {
		
	};

	private onEditExercise = (exercise: Exercise): void => {
		this.props.history.push(`/editexercise/${exercise.id}`);
	}

	public render(): ReactElement {
		return (
			<div>
				<p>Dashboard</p>
				<a>New Circuit</a>
				<CircuitListView circuits={this.props.circuits} onSelect={this.onCircuitClicked} />
				<div id="exercises">
					<h2>Exercises</h2>
					<Link to="/addexercise">Add Exercise</Link>
					<ExerciseListView exercises={this.props.exercises} onSelect={this.onExerciseClicked} onEdit={this.onEditExercise} />
				</div>
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
