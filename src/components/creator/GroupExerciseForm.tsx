import React, { ReactElement } from 'react';

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
	onDelete: () => void;
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

	private onDurationChange = (e) => {
		const duration = e.target.value;
		this.setState(() => ({ duration }));
		this.props.onChange({
			exerciseId: this.props.exerciseId,
			...this.state,
			duration,
		});
	};

	private onCountChange = (e) => {
		const count = e.target.value;
		this.setState(() => ({ count }));
		this.props.onChange({
			exerciseId: this.props.exerciseId,
			...this.state,
			count,
		});
	};

	private onRestChange = (e) => {
		const rest = e.target.value;
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
				<label for="duration">Duration</label>
				<input type="text" id="duration" placeholder="Duration" value={this.state.duration} onChange={this.onDurationChange} autoFocus />
				<label for="duration">Count</label>
				<input type="text" id="count" placeholder="Count" value={this.state.count} onChange={this.onCountChange} />
				<label for="duration">Rest</label>
				<input type="text" id="rest" placeholder="Rest" value={this.state.rest} onChange={this.onRestChange} />
			</div>
		);
	}
}
