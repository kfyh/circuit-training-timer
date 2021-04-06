import React, { ReactElement } from 'react';
import { connect } from 'react-redux';
import { History } from 'history';
import { Dispatch } from 'redux';
import { v4 as uuid } from 'uuid';
import { Container, Typography } from '@material-ui/core';

import { Exercise } from '../../types/circuits';
import { ISelectorAction } from '../../reducers';
import { addExercise } from '../../actions/selectorActions';
import { ExerciseFormData, ExerciseForm } from './ExerciseForm';

type AddExercisePageProps = {
	addExercise: (exercise: Exercise) => void;
	history: History;
};

export class AddExercisePage extends React.Component<AddExercisePageProps> {
	private addExercise = (exerciseFormData: ExerciseFormData) => {
		this.props.addExercise({
			id: uuid(),
			...exerciseFormData,
		});
		this.props.history.goBack();
	};

	public render(): ReactElement {
		return (
			<Container>
				<Typography variant="h1">Add Exercise</Typography>
				<ExerciseForm onSubmit={this.addExercise} />
			</Container>
		);
	}
}

const mapDispatchToProps = (dispatch: Dispatch<ISelectorAction>) => ({
	addExercise: (exercise: Exercise) => dispatch(addExercise(exercise)),
});

export const ConnectedAddExercisePage = connect(undefined, mapDispatchToProps)(AddExercisePage);
