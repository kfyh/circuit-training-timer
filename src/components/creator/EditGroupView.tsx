import React, { FormEvent, ReactElement } from 'react';
import { Exercise } from 'src/types/circuits';
import { GroupExerciseForm } from './GroupExerciseForm';

const GroupExerciseView = () => {
	return <div>Hello</div>;
};

type EditGroupViewProps = {
	exercises: Array<Exercise>;
};

type EditGroupViewState = {
	name: string;
	exercises: Array<{
		exerciseId: string;
		exerciseName: string;
		duration: number;
		count: number;
		rest: number;
	}>;
	selectedAddExercise: string;
};

export class EditGroupView extends React.Component<EditGroupViewProps, EditGroupViewState> {
	constructor(props: EditGroupViewProps) {
		super(props);
		this.state = {
			name: '',
			exercises: [],
			selectedAddExercise: '1',
		};
	}

	private onAddExercise = (e: FormEvent): void => {
		e.preventDefault();

		this.setState((state: EditGroupViewState) => {
			return state;
		});
	};

	private onSelectExerciseChange = (e: any): void => {
		e.preventDefault();
		console.log(e.target);
		this.setState((state:EditGroupViewState) => {
			return {
				selectedAddExercise: e.target.value,
			}
		})
	}

	public render(): ReactElement {
		return (
			<div>
				<h1>Edit Group</h1>
				<form id="group_form">
					<input type="text" placeholder="Name" autoFocus />
					<GroupExerciseView />
					<GroupExerciseForm exerciseId="1" onChange={() => {}} />
					<div>
						<label htmlFor="exercise">Add an exercise:</label>
						<select name="exercises" id="exercise" value={this.state.selectedAddExercise} onChange={this.onSelectExerciseChange}>
							{this.props.exercises.map((exercise) => {
								return <option value={exercise.id}>{exercise.name}</option>;
							})}
						</select>
						<button onClick={this.onAddExercise}>Add Exercise</button>
					</div>
				</form>
			</div>
		);
	}
}
