import React, { ReactElement } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { ExerciseGroup, Exercise } from '../../types/circuits';
import { ISelectorAction } from '../../reducers';
import { addExercise } from '../../actions/selectorActions';
import { GroupView } from '../selector/GroupView';
import { EditGroupView } from '../creator/EditGroupView';

type CreateCircuitViewProps = {
	exercises: Array<Exercise>;
};

type CreateCircuitViewState = {
	name: string;
	exerciseGroups: Array<ExerciseGroup>;
	repetitions: number;
};

export class CreateCircuitView extends React.Component<CreateCircuitViewProps, CreateCircuitViewState> {
	constructor(props: CreateCircuitViewProps) {
		super(props);
		this.state = {
			name: 'new circuit',
			exerciseGroups: [
				{
					name: 'warm up',
					exercises: [
						{
							exerciseId: '1',
							duration: 1,
							count: 1,
							rest: 1,
						},
					],
					repetitions: 1,
					rest: 1,
				},
			],
			repetitions: 1,
		};
	}

	public render(): ReactElement {
		return (
			<div>
				<h1>New Circuit</h1>
				<p>Repetitions</p>
				{this.state.exerciseGroups.map((group) => {
					return <GroupView {...group} />;
				})}
				<EditGroupView exercises={this.props.exercises} />
			</div>
		);
	}
}

const mapDispatchToProps = (dispatch: Dispatch<ISelectorAction>) => ({
	addExercise: (exercise: Exercise) => dispatch(addExercise(exercise)),
});

const mapStateToProps = (state: ISelectorReducerState) => {
	return {
		exercises: state.exercises,
	};
};
export const ConnectedCreateCircuitView = connect(mapStateToProps, mapDispatchToProps)(CreateCircuitView);
