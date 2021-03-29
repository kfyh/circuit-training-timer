import React, { FormEvent, ReactElement } from 'react';
import { Exercise, ExerciseGroup } from 'src/types/circuits';
import { GroupExerciseForm, GroupExerciseFormData } from './GroupExerciseForm';

type GroupExerciseViewProps = {
	exerciseName: string;
	duration: number;
	count: number;
	rest: number;
	onSelect: () => void;
};

const GroupExerciseView = ({ exerciseName, duration, count, rest, onSelect }: GroupExerciseViewProps) => {
	return (
		<div onClick={onSelect}>
			{exerciseName} - duration: {duration}, count: {count}, rest: {rest}
		</div>
	);
};

export type EditGroupViewData = {
	name: string;
	exercises: Array<{
		exerciseId: string;
		exerciseName: string;
		duration: number;
		count: number;
		rest: number;
	}>;
};

type EditGroupViewProps = {
	exerciseGroup: ExerciseGroup;
	exerciseStore: Array<Exercise>;
	onChange: (data: EditGroupViewData) => void;
};

type EditGroupViewState = {
	formData: EditGroupViewData;
	selectedAddExercise: string;
	selectedExercise: number;
};

export class EditGroupView extends React.Component<EditGroupViewProps, EditGroupViewState> {
	constructor(props: EditGroupViewProps) {
		super(props);
		const exercises = this.props.exerciseGroup.exercises.map((exercise) => {
			const storeExercise = this.props.exerciseStore.find((value) => {
				return value.id === exercise.exerciseId;
			});
			const exerciseName = storeExercise ? storeExercise.name : 'Name Unknown';
			return {
				...exercise,
				exerciseName,
			};
		});

		this.state = {
			formData: {
				name: this.props.exerciseGroup.name,
				exercises,
			},
			selectedAddExercise: '1',
			selectedExercise: 0,
		};
	}

	private onAddExercise = (e: FormEvent<HTMLButtonElement>): void => {
		e.preventDefault();

		const exerciseId = this.state.selectedAddExercise;
		const exercise = this.props.exerciseStore.find((value) => value.id === exerciseId);
		if (exercise) {
			this.setState((state: EditGroupViewState) => {
				const exercises = [
					...state.formData.exercises,
					{
						exerciseId,
						exerciseName: exercise.name,
						duration: 0,
						count: 0,
						rest: 0,
					},
				];

				const formData = {
					...state.formData,
					exercises,
				};
				return {
					formData,
					selectedExercise: exercises.length - 1,
				};
			});
		}
	};

	private onExerciseChange = (index: number, data: GroupExerciseFormData) => {
		this.setState((state: EditGroupViewState) => {
			const exercises = state.formData.exercises.map((exercise, exerciseIndex) => {
				if (exerciseIndex === index) {
					return {
						...exercise,
						...data,
					};
				}

				return exercise;
			});

			const formData = {
				...state.formData,
				exercises,
			};

			return {
				formData,
			};
		});
	};

	private onSelectExerciseChange = (e: FormEvent<HTMLSelectElement>): void => {
		e.preventDefault();
		const value = e.currentTarget.value;
		this.setState(() => {
			return {
				selectedAddExercise: value,
			};
		});
	};

	private onSaveChange = (e: FormEvent<HTMLButtonElement>): void => {
		e.preventDefault();
		this.props.onChange(this.state.formData);
	};

	private onNameChange = (e: FormEvent<HTMLInputElement>): void => {
		e.preventDefault();
		const name = e.currentTarget.value;
		this.setState((state: EditGroupViewState) => {
			const formData = {
				...state.formData,
				name,
			};

			return {
				formData,
			};
		});
	};

	private removeExercise = (exerciseIndex: number): void => {
		this.setState((state: EditGroupViewState) => {
			const exercises = state.formData.exercises.filter((_exercise, index) => {
				return exerciseIndex !== index;
			});
			const formData = {
				...state.formData,
				exercises,
			};

			return {
				formData,
			};
		});
	};
	public render(): ReactElement {
		return (
			<div>
				<h1>Editing {this.props.exerciseGroup.name}</h1>
				<form id="group_form">
					<label htmlFor="name">Name:</label>
					<input type="text" id="name" placeholder="Name" value={this.state.formData.name} onChange={this.onNameChange} autoFocus />
					{this.state.formData.exercises.map((exercise, index) => {
						return this.state.selectedExercise === index ? (
							<GroupExerciseForm
								key={index}
								{...exercise}
								onChange={(data) => {
									this.onExerciseChange(index, data);
								}}
								onRemove={() => {
									this.removeExercise(index);
								}}
							/>
						) : (
							<GroupExerciseView
								key={index}
								{...exercise}
								onSelect={() => {
									this.setState(() => {
										return {
											selectedExercise: index,
										};
									});
								}}
							/>
						);
					})}
					<div>
						<label htmlFor="exercise">Add an exercise:</label>
						<select name="exercises" id="exercise" value={this.state.selectedAddExercise} onChange={this.onSelectExerciseChange}>
							{this.props.exerciseStore.map((exercise) => {
								return (
									<option key={exercise.id} value={exercise.id}>
										{exercise.name}
									</option>
								);
							})}
						</select>
						<button onClick={this.onAddExercise}>Add Exercise</button>
					</div>
					<button onClick={this.onSaveChange}>Save Group</button>
				</form>
			</div>
		);
	}
}
