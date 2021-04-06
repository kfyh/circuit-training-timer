import React, { ReactElement } from 'react';
import { Exercise } from '../../types/circuits';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Typography from '@material-ui/core/Typography';
import { Card } from '@material-ui/core';

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
			<Card>
				<Typography>{this.props.exercise.name}</Typography>
				<ButtonGroup>
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
				</ButtonGroup>
			</Card>
		);
	}
}
