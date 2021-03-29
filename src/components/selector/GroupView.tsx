import React, { ReactElement } from 'react';
import { ExerciseGroup } from '../../types/circuits';

type GroupViewProps = ExerciseGroup;

export class GroupView extends React.Component<GroupViewProps> {
	public render(): ReactElement {
		return (
			<div>
				<h1>{this.props.name}</h1>
				{this.props.exercises.map(({ exerciseId, duration, count, rest }) => {
					return (
						<div>
							<p>{exerciseId}</p>
							<p>Duration: {duration}</p>
							<p>Count: {count}</p>
							<p>Name: {rest}</p>
						</div>
					);
				})}
				<p>Repetitions: {this.props.repetitions}</p>
				<p>Rest: {this.props.rest}</p>
			</div>
		);
	}
}
