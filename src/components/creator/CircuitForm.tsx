import React, { ChangeEvent, MouseEvent, ReactElement } from 'react';
import { Box, Button, Container, TextField, Typography } from '@material-ui/core';

import { ExerciseGroup, Exercise } from '../../types/circuits';
import { GroupView } from '../selector/GroupView';
import { EditGroupView, EditGroupViewData } from './EditGroupView';

export type CircuitFormData = {
	name?: string;
	exerciseGroups?: Array<ExerciseGroup>;
	repetitions?: number;
};
type CircuitFormProps = {
	name: string;
	exerciseGroups: Array<ExerciseGroup>;
	repetitions: number;
	exercises: Array<Exercise>;
	onChange: (state: CircuitFormData) => void;
};

type CircuitFormState = {
	name: string;
	exerciseGroups: Array<ExerciseGroup>;
	repetitions: number;
	selectedGroup: number;
	newGroupName: string;
};

export class CircuitForm extends React.Component<CircuitFormProps, CircuitFormState> {
	constructor(props: CircuitFormProps) {
		super(props);
		this.state = {
			name: props.name,
			exerciseGroups: props.exerciseGroups,
			repetitions: props.repetitions,
			selectedGroup: -1,
			newGroupName: 'Group Name',
		};
	}

	private onNameChange = (e: ChangeEvent<HTMLInputElement>): void => {
		e.preventDefault();
		const name = e.target.value;
		this.props.onChange({ name });
	};

	private onRepetitionsChange = (e: ChangeEvent<HTMLInputElement>): void => {
		e.preventDefault();
		const repetitions = parseInt(e.target.value);
		this.props.onChange({ repetitions });
	};

	private onNewGroupNameChange = (e: ChangeEvent<HTMLInputElement>): void => {
		e.preventDefault();
		const newGroupName = e.target.value;
		this.setState(() => {
			return {
				newGroupName,
			};
		});
	};

	private addGroup = (e: MouseEvent<HTMLButtonElement>): void => {
		e.preventDefault();
		const name = this.state.newGroupName;
		const exercise = {
			name,
			exercises: [],
			repetitions: 1,
			rest: 0,
		};
		const exerciseGroups = [...this.props.exerciseGroups, exercise];
		this.props.onChange({ exerciseGroups });
		this.setState(() => {
			return {
				selectedGroup: exerciseGroups.length - 1,
			};
		});
	};

	private onGroupChange = (index: number, data: EditGroupViewData, keepFocus: boolean) => {
		const selectedGroup = keepFocus ? index : -1;
		const editedGroup = {
			name: data.name,
			exercises: data.exercises,
			repetitions: data.repetitions,
			rest: data.rest,
		};

		const exerciseGroups = this.props.exerciseGroups.map((group, groupIndex) => {
			if (groupIndex === index) {
				return {
					...group,
					...editedGroup,
				};
			}

			return group;
		});

		this.props.onChange({ exerciseGroups });

		this.setState(() => {
			return {
				selectedGroup,
			};
		});
	};

	private selectGroup = (index: number) => {
		this.setState(() => {
			return {
				selectedGroup: index,
			};
		});
	};

	public render(): ReactElement {
		return (
			<Container>
				<Typography variant="h1">{this.props.name ? this.props.name : 'New Circuit'}</Typography>
				<TextField label="Name" type="text" id="name" placeholder="Name" value={this.props.name} onChange={this.onNameChange} autoFocus />
				<TextField
					label="Repetitions"
					type="number"
					id="repetitions"
					placeholder="Repetitions"
					value={this.props.repetitions}
					onChange={this.onRepetitionsChange}
				/>
				{this.props.exerciseGroups.map((group, index) => {
					return this.state.selectedGroup === index ? (
						<EditGroupView
							key={index}
							exerciseGroup={group}
							exerciseStore={this.props.exercises}
							onChange={(data: EditGroupViewData, keepFocus: boolean) => {
								this.onGroupChange(index, data, keepFocus);
							}}
						/>
					) : (
						<GroupView
							key={index}
							group={group}
							exerciseStore={this.props.exercises}
							onClick={() => {
								this.selectGroup(index);
							}}
						/>
					);
				})}
				<Box>
					<TextField type="text" placeholder="Group" value={this.state.newGroupName} onChange={this.onNewGroupNameChange} />
					<Button onClick={this.addGroup}>Add Group</Button>
				</Box>
			</Container>
		);
	}
}
