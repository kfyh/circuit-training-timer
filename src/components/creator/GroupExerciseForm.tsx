import React, { ReactElement } from 'react';

export type GroupExerciseFormData = {
	exerciseId: string;
	duration: number;
	count: number;
	rest: number;
};

type GroupExerciseFormProps = {
	exerciseId: string;
	onChange: (exercise: GroupExerciseFormData) => void;
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
			duration: 0,
			count: 0,
			rest: 0,
		};
	}

	private onDurationChange = (e) => {
		const duration = e.target.value;
		this.setState(() => ({ duration }));
	};

	private onCountChange = (e) => {
		const count = e.target.value;
		this.setState(() => ({ count }));
	};

	private onRestChange = (e) => {
		const rest = e.target.value;
		this.setState(() => ({ rest }));
	};

	public render(): ReactElement {
		return (
			<div>
				Exercise Name
				<input type="text" placeholder="Duration" value={this.state.duration} onChange={this.onDurationChange} autoFocus />
				<input type="text" placeholder="Count" value={this.state.count} onChange={this.onCountChange} />
				<input type="text" placeholder="Rest" value={this.state.rest} onChange={this.onRestChange} />
			</div>
		);
	}
}
