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
			<div onClick={this.props.onClick}>
				<h1>{this.props.group.name}</h1>
				{this.props.group.exercises.length <= 0 && <p>No Exercises Added</p>}
				{this.props.group.exercises.map(({ exerciseId, duration, count, rest }) => {
					const exerciseName = this.props.exerciseStore.reduce<string>((acc: string, curr: Exercise) => {
						return curr.id === exerciseId ? curr.name : acc;
					}, '');

					return (
						<div>
							<p>
								{exerciseName} - Duration: {duration}, Count: {count}, Name: {rest}
							</p>
						</div>
					);
				})}
				<p>
					Repetitions: {this.props.group.repetitions}, Rest: {this.props.group.rest}
				</p>
			</div>
		);
	}
}
