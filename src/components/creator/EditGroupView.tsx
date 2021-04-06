import { Box, Button, Container, Card, Select, TextField, Typography } from '@material-ui/core';
import React, { ChangeEvent, FormEvent, MouseEvent, ReactElement } from 'react';
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
		<Card onClick={onSelect}>
			{exerciseName} - duration: {duration}, count: {count}, rest: {rest}
		</Card>
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
	repetitions: number;
	rest: number;
};

type EditGroupViewProps = {
	exerciseGroup: ExerciseGroup;
	exerciseStore: Array<Exercise>;
	onChange: (data: EditGroupViewData, keepFocus: boolean) => void;
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
				repetitions: 1,
				rest: 0,
			},
			selectedAddExercise: this.props.exerciseStore[0].id,
			selectedExercise: 0,
		};
	}

	private onAddExercise = (): void => {
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

	private onSelectExerciseChange = (e: ChangeEvent<{ name?: string; value: unknown }>): void => {
		const value = e.target.value;
		this.setState(() => {
			return {
				selectedAddExercise: value,
			} as EditGroupViewState;
		});
	};

	private onSaveChange = (): void => {
		this.props.onChange(this.state.formData, false);
	};

	private onNameChange = (e: ChangeEvent<HTMLInputElement>): void => {
		const name = e.target.value;
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

	private onRepetitionsChange = (e: ChangeEvent<HTMLInputElement>): void => {
		const value = e.target.value;
		const repetitions = parseInt(value);

		this.setState((state: EditGroupViewState) => {
			const formData = {
				...state.formData,
				repetitions,
			};

			return {
				formData,
			};
		});
	};

	private onRestChange = (e: ChangeEvent<HTMLInputElement>): void => {
		const value = e.target.value;
		const rest = parseInt(value);

		this.setState((state: EditGroupViewState) => {
			const formData = {
				...state.formData,
				rest,
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
			<Container>
				<Typography variant="h1">Editing {this.props.exerciseGroup.name}</Typography>
				<TextField label="Name" type="text" id="name" placeholder="Name" value={this.state.formData.name} onChange={this.onNameChange} autoFocus />
				<TextField
					label="Repetitions"
					type="number"
					id="repetitions"
					placeholder="1"
					value={this.state.formData.repetitions}
					onChange={this.onRepetitionsChange}
				/>
				<TextField label="Rest" type="number" id="rest" placeholder="0" value={this.state.formData.rest} onChange={this.onRestChange} />
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
				<Box>
					<Select label="Add an exercise" name="exercises" id="exercise" value={this.state.selectedAddExercise} onChange={this.onSelectExerciseChange}>
						{this.props.exerciseStore.map((exercise) => {
							return (
								<option key={exercise.id} value={exercise.id}>
									{exercise.name}
								</option>
							);
						})}
					</Select>
					<Button onClick={this.onAddExercise}>Add Exercise</Button>
				</Box>
				<Button onClick={this.onSaveChange}>Save Group</Button>
			</Container>
		);
	}
}
