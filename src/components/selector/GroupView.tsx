import { Paper, Typography } from '@material-ui/core';
import React, { ReactElement } from 'react';
import { Exercise, ExerciseGroup } from '../../types/circuits';

export type GroupViewData = {
	name: string;
	exercises: Array<{
		exerciseName: string;
		duration: number;
		count: number;
		rest: number;
	}>;
};

type GroupViewProps = {
	group: ExerciseGroup;
	exerciseStore: Array<Exercise>;
	onClick: () => void;
};

export class GroupView extends React.Component<GroupViewProps> {
	public render(): ReactElement {
		return (
			<Paper onClick={this.props.onClick}>
				<Typography variant="h6">{this.props.group.name}</Typography>
				{this.props.group.exercises.length <= 0 && <Typography variant="body1">No Exercises Added</Typography>}
				{this.props.group.exercises.map(({ exerciseId, duration, count, rest }) => {
					const exerciseName = this.props.exerciseStore.reduce<string>((acc: string, curr: Exercise) => {
						return curr.id === exerciseId ? curr.name : acc;
					}, '');

					return (
						<Typography variant="body1">
								{exerciseName} - Duration: {duration}, Count: {count}, Name: {rest}
						</Typography>
					);
				})}
				<Typography variant="body1">
					Repetitions: {this.props.group.repetitions}, Rest: {this.props.group.rest}
				</Typography>
			</Paper>
		);
	}
}
