import React, { FormEvent, ReactElement } from 'react';
import { Exercise } from 'src/types/circuits';
import { GroupExerciseForm } from './GroupExerciseForm';

const GroupExerciseView = ({ exerciseName, duration, count, rest }) => {
	return (
		<div>
			{exerciseName}: duration: {duration}, count: {count}, rest: {rest}
		</div>
	);
};

type EditGroupViewProps = {
	exerciseStore: Array<Exercise>;
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
	selectedExercise: number;
};

export class EditGroupView extends React.Component<EditGroupViewProps, EditGroupViewState> {
	constructor(props: EditGroupViewProps) {
		super(props);
		this.state = {
			name: '',
			exercises: [],
			selectedAddExercise: '1',
			selectedExercise: 0,
		};
	}

	private onAddExercise = (e: FormEvent<HTMLButtonElement>): void => {
		e.preventDefault();

		const exerciseId = this.state.selectedAddExercise;
		console.log(exerciseId);
		const exercise = this.props.exerciseStore.find((value) => value.id === exerciseId);
		if (exercise) {
			this.setState((state: EditGroupViewState) => {
				const exercises = [
					...state.exercises,
					{
						exerciseId,
						exerciseName: exercise.name,
						duration: 0,
						count: 0,
						rest: 0,
					},
				];

				return {
					...state,
					exercises,
					selectedExercise: exercises.length - 1,
				};
			});
		}
	};

	private onSelectExerciseChange = (e: FormEvent<HTMLSelectElement>): void => {
		e.preventDefault();
		const value = e.target.value;
		if (this.state.selectedAddExercise !== value) {
			this.setState(() => {
				return {
					selectedAddExercise: value,
				};
			});
		}
	};

	public render(): ReactElement {
		return (
			<div>
				<h1>Edit Group</h1>
				<form id="group_form">
					<input type="text" placeholder="Name" autoFocus />
					{this.state.exercises.map((exercise, index) => {
						return this.state.selectedExercise === index ? (
							<GroupExerciseForm exerciseId={exercise.exerciseId} onChange={() => {}} />
						) : (
							<GroupExerciseView {...exercise} />
						);
					})}
					<div>
						<label htmlFor="exercise">Add an exercise:</label>
						<select name="exercises" id="exercise" value={this.state.selectedAddExercise} onChange={this.onSelectExerciseChange}>
							{this.props.exerciseStore.map((exercise) => {
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
