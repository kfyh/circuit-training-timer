import React, { FormEvent, ReactElement } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { v4 as uuid } from 'uuid';
import { History } from 'history';
import { ExerciseGroup, Exercise, Circuit } from '../../types/circuits';
import { ISelectorAction, ISelectorReducerState } from '../../reducers';
import { addCircuit } from '../../actions/selectorActions';
import { CircuitForm, CircuitFormData } from './CircuitForm';

type AddCircuitPageProps = {
	exercises: Array<Exercise>;
	addCircuit: (circuit: Circuit) => void;
	history: History;
};

type AddCircuitPageState = {
	name: string;
	exerciseGroups: Array<ExerciseGroup>;
	repetitions: number;
};

export class AddCircuitPage extends React.Component<AddCircuitPageProps, AddCircuitPageState> {
	constructor(props: AddCircuitPageProps) {
		super(props);
		this.state = {
			name: 'new circuit',
			exerciseGroups: [],
			repetitions: 1,
		};
	}

	private onChange = (data: CircuitFormData): void => {
		this.setState(() => {
			return { ...data };
		});
	};

	private saveCircuit = (e: FormEvent<HTMLButtonElement>): void => {
		e.preventDefault();
		const circuit: Circuit = {
			id: uuid(),
			name: this.state.name,
			exerciseGroups: this.state.exerciseGroups,
			repetitions: this.state.repetitions,
		};

		this.props.addCircuit(circuit);
		this.props.history.goBack();
	};

	public render(): ReactElement {
		return (
			<div>
				<CircuitForm {...this.state} exercises={this.props.exercises} onChange={this.onChange} />
				<button onClick={this.saveCircuit}>Save Circuit</button>
			</div>
		);
	}
}

const mapDispatchToProps = (dispatch: Dispatch<ISelectorAction>) => ({
	addCircuit: (circuit: Circuit) => dispatch(addCircuit(circuit)),
});

const mapStateToProps = (state: ISelectorReducerState) => {
	return {
		exercises: state.exercises,
	};
};
export const ConnectedAddCircuitPage = connect(mapStateToProps, mapDispatchToProps)(AddCircuitPage);
