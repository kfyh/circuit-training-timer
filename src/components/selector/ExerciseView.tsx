import React, { ReactElement } from 'react';
import { Exercise } from '../../types/circuits';

type ExerciseViewProps = {
	exercise: Exercise;
	onClick: (exercise: Exercise) => void;
};

export class ExerciseView extends React.Component<ExerciseViewProps> {
	constructor(props: ExerciseViewProps) {
		super(props);
	}

	public render(): ReactElement {
		return (
			<div>
				{this.props.exercise.name}
				<button
					onClick={(e) => {
						e.preventDefault();
						this.props.onClick(this.props.exercise);
					}}
				>
					Select
				</button>
			</div>
		);
	}
}
