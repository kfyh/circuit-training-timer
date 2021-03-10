import React, { ReactElement } from 'react';
import { Exercise } from '../../types/circuits';
import { ExerciseView } from './ExerciseView';

type ExerciseListViewProps = {
	exercises: Array<Exercise>;
	onSelect: (exercise: Exercise) => void;
};

export const ExerciseListView = ({ exercises, onSelect }: ExerciseListViewProps): ReactElement => {
	return (
		<div>
			{exercises.map((exercise) => {
				return <ExerciseView key={exercise.id} exercise={exercise} onClick={onSelect} />;
			})}
		</div>
	);
};
