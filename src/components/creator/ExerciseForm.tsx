import React, { ReactElement } from 'react';

export type ExerciseFormData = {
		name: string;
		description?: string;
};

type ExerciseFormProps = {
	onSubmit: (exercise: ExerciseFormData) => void;
};

type ExerciseFormState = {
	name: string;
	description: string;
}

export class ExerciseForm extends React.Component<ExerciseFormProps, ExerciseFormState> {

	constructor(props: ExerciseFormProps) {
		super(props);
		this.state = {
			name: '',
			description: ''
		};
	}

	onNameChange = (e) => {
        const name = e.target.value;
        this.setState(() => ({name}));
    };

	onDescriptionChange = (e) => {
        const description = e.target.value;
        this.setState(() => ({description}));
    };

	public render(): ReactElement {
		return (
			<form
				onSubmit={(e) => {
					e.preventDefault();
					this.props.onSubmit({ name: this.state.name, description: this.state.description  });
				}}
			>
				<input type="text" placeholder="Name" value={this.state.name} onChange={this.onNameChange} autoFocus />
				<input type="text" placeholder="Description" value={this.state.description} onChange={this.onDescriptionChange} />
				<button>Submit</button>
			</form>
		);
	}
}
