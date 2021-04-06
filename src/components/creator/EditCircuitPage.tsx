import React, { FormEvent, MouseEvent, ReactElement } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { RouteComponentProps } from 'react-router-dom';
import { History } from 'history';
import { ExerciseGroup, Exercise, Circuit, NullCircuit } from '../../types/circuits';
import { ISelectorAction, ISelectorReducerState } from '../../reducers';
import { editCircuit } from '../../actions/selectorActions';
import { CircuitForm, CircuitFormData } from './CircuitForm';
import { Button, Container } from '@material-ui/core';

interface EditCircuitPageProps extends RouteComponentProps<{ id: string }> {
	circuit: Circuit;
	exercises: Array<Exercise>;
	editCircuit: (circuit: Circuit) => void;
	history: History;
};

type EditCircuitPageState = {
	name: string;
	exerciseGroups: Array<ExerciseGroup>;
	repetitions: number;
};

export class EditCircuitPage extends React.Component<EditCircuitPageProps, EditCircuitPageState> {
	constructor(props: EditCircuitPageProps) {
		super(props);
		this.state = {
			...props.circuit,
		};
	}

	private onChange = (data: CircuitFormData): void => {
		this.setState(() => {
			return { ...data } as EditCircuitPageState;
		});
	};

	private saveCircuit = (e: MouseEvent<HTMLButtonElement>): void => {
		e.preventDefault();
		const circuit: Circuit = {
			id: this.props.circuit.id,
			name: this.state.name,
			exerciseGroups: this.state.exerciseGroups,
			repetitions: this.state.repetitions,
		};

		this.props.editCircuit(circuit);
		this.props.history.goBack();
	};

	public render(): ReactElement {
		return (
			<Container>
				<CircuitForm {...this.state} exercises={this.props.exercises} onChange={this.onChange} />
				<Button variant="contained" color="primary" onClick={this.saveCircuit}>
					Save Circuit
				</Button>
			</Container>
		);
	}
}

const mapDispatchToProps = (dispatch: Dispatch<ISelectorAction>) => ({
	editCircuit: (circuit: Circuit) => dispatch(editCircuit(circuit)),
});

const mapStateToProps = (state: ISelectorReducerState, ownProps: EditCircuitPageProps) => {
	const id = ownProps.match.params.id;
	let circuit = state.circuits.find((circuit: Circuit) => circuit.id === id);
	if (!circuit) {
		circuit = NullCircuit;
	}

	return {
		circuit,
		exercises: state.exercises,
	};
};
export const ConnectedEditCircuitPage = connect(mapStateToProps, mapDispatchToProps)(EditCircuitPage);
