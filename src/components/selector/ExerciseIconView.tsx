import React, { ReactElement } from 'react';
import { Exercise } from '../../types/circuits';

type ExerciseIconViewProps = {
	exercise: Exercise;
	onSelect: (exercise: Exercise) => void;
	onEdit: (exercise: Exercise) => void;
};

export class ExerciseIconView extends React.Component<ExerciseIconViewProps> {
	constructor(props: ExerciseIconViewProps) {
		super(props);
	}

	public render(): ReactElement {
		return (
			<div>
				{this.props.exercise.name}
				<button
					onClick={(e) => {
						e.preventDefault();
						this.props.onSelect(this.props.exercise);
					}}
				>
					Info
				</button>
				<button
					onClick={(e) => {
						e.preventDefault();
						this.props.onEdit(this.props.exercise);
					}}
				>
					Edit
				</button>
			</div>
		);
	}
}
