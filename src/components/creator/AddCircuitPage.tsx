import React, { FormEvent, ReactElement } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { ExerciseGroup, Exercise } from '../../types/circuits';
import { ISelectorAction, ISelectorReducerState } from '../../reducers';
import { addExercise } from '../../actions/selectorActions';
import { GroupView } from '../selector/GroupView';
import { EditGroupView } from './EditGroupView';

type AddCircuitViewProps = {
	exercises: Array<Exercise>;
};

type AddCircuitViewState = {
	name: string;
	exerciseGroups: Array<ExerciseGroup>;
	repetitions: number;
	newGroupName: string;
};

export class AddCircuitPage extends React.Component<AddCircuitViewProps, AddCircuitViewState> {
	constructor(props: AddCircuitViewProps) {
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
						{
							exerciseId: '3',
							duration: 4,
							count: 3,
							rest: 3,
						},
					],
					repetitions: 1,
					rest: 1,
				},
			],
			repetitions: 1,
			newGroupName: 'Group Name',
		};
	}

	private onNewGroupNameChange = (e: FormEvent<HTMLInputElement>): void => {
		e.preventDefault();
		const newGroupName = e.target.value;
		if (this.state.newGroupName !== newGroupName) {
			this.setState(() => {
				return {
					newGroupName,
				};
			});
		}
	};

	private addGroup = (e: FormEvent<HTMLButtonElement>): void => {
		e.preventDefault();
		const name = this.state.newGroupName;
		this.setState((state: AddCircuitViewState) => {
			const exerciseGroups = [
				...this.state.exerciseGroups,
				{
					name,
					exercises: [],
					repetitions: 1,
					rest: 0,
				}
			];
			return {
				...state,
				exerciseGroups,
			};
		});
	};

	public render(): ReactElement {
		return (
			<div>
				<h1>New Circuit</h1>
				<p>Repetitions</p>
				{this.state.exerciseGroups.map((group) => {
					return <GroupView {...group} />;
				})}
				<EditGroupView exerciseStore={this.props.exercises} />
				<div>
					<input type="text" placeholder="Group" value={this.state.newGroupName} onChange={this.onNewGroupNameChange} />
					<button onClick={this.addGroup}>Add Group</button>
				</div>
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
export const ConnectedAddCircuitPage = connect(mapStateToProps, mapDispatchToProps)(AddCircuitPage);
