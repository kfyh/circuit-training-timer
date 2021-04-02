import React, { ReactElement } from 'react';
import { FlattenedExercise } from '../../types/circuits';

type ExerciseLabelProps = {
	exercise: FlattenedExercise;
	isResting: boolean;
};

export function ExerciseLabel(props: ExerciseLabelProps): ReactElement {
	const { exercise, isResting } = props;
	const excerciseLabel = exercise.name;

	return (
		<div>
			<p>
				{exercise.groupName} ({exercise.groupRepIndex}/{exercise.groupRepetitions})
			</p>
			{isResting ? (
				<p>Rest</p>
			) : (
				<p>
					{excerciseLabel} {exercise.count && exercise.count > 0 && `x ${exercise.count}`}
				</p>
			)}
		</div>
	);
}
