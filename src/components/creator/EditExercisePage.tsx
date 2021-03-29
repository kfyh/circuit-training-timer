import React, { ReactElement } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { Dispatch } from 'redux';
import { Exercise, NullExercise } from '../../types/circuits';
import { ISelectorAction, ISelectorReducerState } from '../../reducers';
import { editExercise } from '../../actions/selectorActions';
import { ExerciseFormData, ExerciseForm } from './ExerciseForm';

interface EditExercisePageProps extends RouteComponentProps<{ id: string }> {
	exercise: Exercise;
	editExercise: (exercise: Exercise) => void;
}

export class EditExercisePage extends React.Component<EditExercisePageProps> {
	private editExercise = (exerciseFormData: ExerciseFormData) => {
		this.props.editExercise({
			...this.props.exercise,
			...exerciseFormData,
		});
		this.props.history.goBack();
	};

	public render(): ReactElement {
		return (
			<div>
				<h1>Edit Exercise: {this.props.exercise.name}</h1>
				<ExerciseForm exercise={this.props.exercise} onSubmit={this.editExercise} />
			</div>
		);
	}
}

const mapStateToProps = (state: ISelectorReducerState, ownProps: EditExercisePageProps) => {
	const id = ownProps.match.params.id;
	const exercise = state.exercises.find((exercise: Exercise) => exercise.id === id);
	if (exercise) {
		return { exercise };
	} else {
		return { exercise: NullExercise };
	}
};

const mapDispatchToProps = (dispatch: Dispatch<ISelectorAction>) => ({
	editExercise: (exercise: Exercise) => dispatch(editExercise(exercise)),
});

export const ConnectedEditExercisePage = connect(mapStateToProps, mapDispatchToProps)(EditExercisePage);
