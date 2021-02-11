import React, { ReactElement } from 'react';
import { FlattenedStep } from '../../types/circuits';

type ExerciseLabelProps = {
	step: FlattenedStep;
};

export function ExerciseLabel(props: ExerciseLabelProps): ReactElement {
	const step = props.step;
	const excerciseLabel = step.label;
	const totalReps = step.repTotal;

	return (
		<div>
			{step.parentLabel && (
				<p>
					{step.parentLabel} ({step.parentRepIndex}/{step.parentRepTotal})
				</p>
			)}
			<p>
				{excerciseLabel} ({props.step.repIndex}/{totalReps})
			</p>
		</div>
	);
}
