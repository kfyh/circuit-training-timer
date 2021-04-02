import React, { FormEvent, ReactElement } from 'react';

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

type GroupExerciseFormState = {
	duration: string;
	count: string;
	rest: string;
};

export class GroupExerciseForm extends React.Component<GroupExerciseFormProps, GroupExerciseFormState> {
	constructor(props: GroupExerciseFormProps) {
		super(props);
		this.state = {
			duration: props.duration.toString(),
			count: props.count.toString(),
			rest: props.rest.toString(),
		};
	}

	private onDurationChange = (e: FormEvent<HTMLInputElement>): void => {
		const value = e.currentTarget.value;
		const duration = Number.parseInt(value);
		this.setState(() => ({ duration: value }));
		if (!isNaN(duration)) {
			this.props.onChange({
				duration,
			});
		}
	};

	private onCountChange = (e: FormEvent<HTMLInputElement>): void => {
		const value = e.currentTarget.value;
		const count = Number.parseInt(value);
		this.setState(() => ({ count: value }));
		if (!isNaN(count)) {
			this.props.onChange({
				count,
			});
		}
	};

	private onRestChange = (e: FormEvent<HTMLInputElement>): void => {
		const value = e.currentTarget.value;
		const rest = Number.parseInt(value);
		this.setState(() => ({ rest: value }));
		if (!isNaN(rest)) {
			this.props.onChange({
				rest,
			});
		}
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
