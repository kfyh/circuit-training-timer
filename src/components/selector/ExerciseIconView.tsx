import React, { ReactElement } from 'react';
import { Exercise } from '../../types/circuits';
import Button from '@material-ui/core/Button';

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
				<Button
					onClick={(e) => {
						e.preventDefault();
						this.props.onSelect(this.props.exercise);
					}}
					variant="contained"
				>
					Info
				</Button>
				<Button
					onClick={(e) => {
						e.preventDefault();
						this.props.onEdit(this.props.exercise);
					}}
					variant="contained"
					color="primary"
				>
					Edit
				</Button>
			</div>
		);
	}
}
