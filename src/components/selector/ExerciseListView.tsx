import { Grid } from '@material-ui/core';
import React, { ReactElement } from 'react';
import { Exercise } from '../../types/circuits';
import { ExerciseIconView } from './ExerciseIconView';

type ExerciseListViewProps = {
	exercises: Array<Exercise>;
	onSelect: (exercise: Exercise) => void;
	onEdit: (Exercise: Exercise) => void;
};

export const ExerciseListView = ({ exercises, onSelect, onEdit }: ExerciseListViewProps): ReactElement => {
	return (
		<Grid container spacing={2}>
			{exercises.map((exercise) => {
				return (
					<Grid item key={exercise.id}>
						<ExerciseIconView key={exercise.id} exercise={exercise} onSelect={onSelect} onEdit={onEdit} />
					</Grid>
				);
			})}
		</Grid>
	);
};
