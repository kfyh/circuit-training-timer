import { Button, Container, TextField, Typography } from '@material-ui/core';
import React, { ChangeEvent, ReactElement } from 'react';

export type GroupExerciseFormData = {
	exerciseId?: string;
	duration?: number;
	count?: number;
	rest?: number;
};

type GroupExerciseFormProps = {
	exerciseId: string;
	exerciseName: string;
	duration: number;
	count: number;
	rest: number;
	onChange: (exercise: GroupExerciseFormData) => void;
	onRemove: () => void;
};

export class GroupExerciseForm extends React.Component<GroupExerciseFormProps> {
	constructor(props: GroupExerciseFormProps) {
		super(props);
	}

	private onDurationChange = (e: ChangeEvent<HTMLInputElement>): void => {
		const value = e.currentTarget.value;
		const duration = Number.parseInt(value);
		this.props.onChange({ duration });
	};

	private onCountChange = (e: ChangeEvent<HTMLInputElement>): void => {
		const value = e.currentTarget.value;
		const count = Number.parseInt(value);
		this.props.onChange({ count });
	};

	private onRestChange = (e: ChangeEvent<HTMLInputElement>): void => {
		const value = e.currentTarget.value;
		const rest = Number.parseInt(value);
		this.props.onChange({ rest });
	};

	public render(): ReactElement {
		return (
			<Container>
				<Typography variant="h6">{this.props.exerciseName}</Typography>
				<TextField label="duration" type="number" id="duration" placeholder="20" value={this.props.duration} onChange={this.onDurationChange} autoFocus />
				<TextField label="Count" type="number" id="count" placeholder="1" value={this.props.count} onChange={this.onCountChange} />
				<TextField label="Rest" type="number" id="rest" placeholder="0" value={this.props.rest} onChange={this.onRestChange} />
				<Button onClick={this.props.onRemove}>Remove</Button>
			</Container>
		);
	}
}
