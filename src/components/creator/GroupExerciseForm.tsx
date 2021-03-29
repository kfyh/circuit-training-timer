import React, { FormEvent, ReactElement } from 'react';

export type GroupExerciseFormData = {
	exerciseId: string;
	duration: number;
	count: number;
	rest: number;
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

type GroupExerciseFormState = {
	duration: number;
	count: number;
	rest: number;
};

export class GroupExerciseForm extends React.Component<GroupExerciseFormProps, GroupExerciseFormState> {
	constructor(props: GroupExerciseFormProps) {
		super(props);
		this.state = {
			duration: props.duration,
			count: props.count,
			rest: props.rest,
		};
	}

	private onDurationChange = (e: FormEvent<HTMLInputElement>): void => {
		const duration = Number.parseInt(e.currentTarget.value);
		this.setState(() => ({ duration }));
		this.props.onChange({
			exerciseId: this.props.exerciseId,
			...this.state,
			duration,
		});
	};

	private onCountChange = (e: FormEvent<HTMLInputElement>): void => {
		const count = Number.parseInt(e.currentTarget.value);
		this.setState(() => ({ count }));
		this.props.onChange({
			exerciseId: this.props.exerciseId,
			...this.state,
			count,
		});
	};

	private onRestChange = (e: FormEvent<HTMLInputElement>): void => {
		const rest = Number.parseInt(e.currentTarget.value);
		this.setState(() => ({ rest }));
		this.props.onChange({
			exerciseId: this.props.exerciseId,
			...this.state,
			rest,
		});
	};

	public render(): ReactElement {
		return (
			<div>
				<p>{this.props.exerciseName}</p>
				<label htmlFor="duration">Duration</label>
				<input type="text" id="duration" placeholder="Duration" value={this.state.duration} onChange={this.onDurationChange} autoFocus />
				<label htmlFor="duration">Count</label>
				<input type="text" id="count" placeholder="Count" value={this.state.count} onChange={this.onCountChange} />
				<label htmlFor="duration">Rest</label>
				<input type="text" id="rest" placeholder="Rest" value={this.state.rest} onChange={this.onRestChange} />
				<button onClick={this.props.onRemove}>Remove</button>
			</div>
		);
	}
}
