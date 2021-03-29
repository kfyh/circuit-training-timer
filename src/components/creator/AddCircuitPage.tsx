import React, { FormEvent, ReactElement } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { ExerciseGroup, Exercise } from '../../types/circuits';
import { ISelectorAction, ISelectorReducerState } from '../../reducers';
import { addExercise } from '../../actions/selectorActions';
import { GroupView } from '../selector/GroupView';
import { EditGroupView, EditGroupViewData } from './EditGroupView';

type AddCircuitPageProps = {
	exercises: Array<Exercise>;
};

type AddCircuitPageState = {
	name: string;
	exerciseGroups: Array<ExerciseGroup>;
	repetitions: number;
	selectedGroup: number;
	newGroupName: string;
};

export class AddCircuitPage extends React.Component<AddCircuitPageProps, AddCircuitPageState> {
	constructor(props: AddCircuitPageProps) {
		super(props);
		this.state = {
			name: 'new circuit',
			exerciseGroups: [],
			repetitions: 1,
			selectedGroup: 0,
			newGroupName: 'Group Name',
		};
	}

	private onNewGroupNameChange = (e: FormEvent<HTMLInputElement>): void => {
		e.preventDefault();
		const newGroupName = e.currentTarget.value;
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
		this.setState((state: AddCircuitPageState) => {
			const exerciseGroups = [
				...this.state.exerciseGroups,
				{
					name,
					exercises: [],
					repetitions: 1,
					rest: 0,
				},
			];
			return {
				...state,
				exerciseGroups,
				selectedGroup: exerciseGroups.length - 1,
			};
		});
	};

	private onGroupChange = (index: number, data: EditGroupViewData) => {
		this.setState((state: AddCircuitPageState) => {
			const exerciseGroups = state.exerciseGroups.map((group, groupIndex) => {
				if (groupIndex === index) {
					return {
						...group,
						...data,
					};
				}

				return group;
			});

			return {
				exerciseGroups,
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
			<div>
				<h1>New Circuit</h1>
				<p>Repetitions</p>
				{this.state.exerciseGroups.map((group, index) => {
					return this.state.selectedGroup === index ? (
						<EditGroupView
							key={index}
							exerciseGroup={group}
							exerciseStore={this.props.exercises}
							onChange={(data) => {
								this.onGroupChange(index, data);
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
