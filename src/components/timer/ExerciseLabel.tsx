import React, { ReactElement } from 'react';
import { FlattenedExercise } from '../../types/circuits';

type ExerciseLabelProps = {
	exercise: FlattenedExercise;
};

export function ExerciseLabel(props: ExerciseLabelProps): ReactElement {
	const exercise = props.exercise;
	const excerciseLabel = exercise.name;

	return (
		<div>
			<p>
				{exercise.groupName} ({exercise.groupRepIndex}/{exercise.groupRepetitions})
			</p>
			<p>{excerciseLabel}</p>
		</div>
	);
}
