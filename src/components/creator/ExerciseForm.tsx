import { Button, Container, TextField } from '@material-ui/core';
import React, { FormEvent, ReactElement, useState } from 'react';
import { Exercise } from 'src/types/circuits';

export type ExerciseFormData = {
	name: string;
	description?: string;
};

type ExerciseFormProps = {
	exercise?: Exercise;
	onSubmit: (exercise: ExerciseFormData) => void;
};

export const ExerciseForm = (props: ExerciseFormProps): ReactElement => {
	const initialName = props.exercise ? props.exercise.name : '';
	const initialDescription = props.exercise ? (props.exercise.description ? props.exercise.description : '') : '';
	const [name, setName] = useState(initialName);
	const [description, setDescription] = useState(initialDescription);
	return (
		<Container maxWidth="md">
			<TextField
				type="text"
				placeholder="Name"
				value={name}
				onChange={(e) => {
					e.preventDefault();
					setName(e.currentTarget.value);
				}}
				autoFocus
			/>
			<TextField
				type="text"
				placeholder="Description"
				value={description}
				onChange={(e) => {
					e.preventDefault();
					setDescription(e.currentTarget.value);
				}}
			/>
			<Button
				onClick={(e: FormEvent<HTMLButtonElement>) => {
					e.preventDefault();
					props.onSubmit({ name, description });
				}}
			>
				Submit
			</Button>
		</Container>
	);
};
