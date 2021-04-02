import React, { FormEvent, ReactElement } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { v4 as uuid } from 'uuid';
import { History } from 'history';
import { ExerciseGroup, Exercise, Circuit } from '../../types/circuits';
import { ISelectorAction, ISelectorReducerState } from '../../reducers';
import { addCircuit } from '../../actions/selectorActions';
import { GroupView } from '../selector/GroupView';
import { EditGroupView, EditGroupViewData } from './EditGroupView';

type AddCircuitPageProps = {
	exercises: Array<Exercise>;
	addCircuit: (circuit: Circuit) => void;
	history: History;
};

type AddCircuitPageState = {
	name: string;
	exerciseGroups: Array<ExerciseGroup>;
	repetitions: string;
	selectedGroup: number;
	newGroupName: string;
};

export class AddCircuitPage extends React.Component<AddCircuitPageProps, AddCircuitPageState> {
	constructor(props: AddCircuitPageProps) {
		super(props);
		this.state = {
			name: 'new circuit',
			exerciseGroups: [],
			repetitions: '1',
			selectedGroup: -1,
			newGroupName: 'Group Name',
		};
	}
	private onNameChange = (e: FormEvent<HTMLInputElement>): void => {
		e.preventDefault();
		const name = e.currentTarget.value;
		this.setState(() => {
			return {
				name,
			};
		});
	};

	private onRepetitionsChange = (e: FormEvent<HTMLInputElement>): void => {
		e.preventDefault();
		const repetitions = e.currentTarget.value;

		this.setState(() => {
			return {
				repetitions,
			};
		});
	};

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

	private onGroupChange = (index: number, data: EditGroupViewData, keepFocus: boolean) => {
		const selectedGroup = keepFocus ? index : -1;
		const editedGroup = {
			name: data.name,
			exercises: data.exercises,
			repetitions: parseInt(data.repetitions),
			rest: parseInt(data.rest)
		};
		this.setState((state: AddCircuitPageState) => {
			const exerciseGroups = state.exerciseGroups.map((group, groupIndex) => {
				if (groupIndex === index) {
					return {
						...group,
						...editedGroup,
					};
				}

				return group;
			});

			return {
				exerciseGroups,
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

	private saveCircuit = (e: FormEvent<HTMLButtonElement>): void => {
		e.preventDefault();
		const circuit: Circuit = {
			id: uuid(),
			name: this.state.name,
			exerciseGroups: this.state.exerciseGroups,
			repetitions: parseInt(this.state.repetitions),
		};

		this.props.addCircuit(circuit);
		this.props.history.goBack();
	};

	public render(): ReactElement {
		return (
			<div>
				<h1>{this.state.name ? this.state.name : 'New Circuit'}</h1>
				<input type="text" id="name" placeholder="Name" value={this.state.name} onChange={this.onNameChange} autoFocus />
				<label htmlFor="repetitions">Repetitions</label>
				<input type="text" id="repetitions" placeholder="Repetitions" value={this.state.repetitions} onChange={this.onRepetitionsChange} />
				{this.state.exerciseGroups.map((group, index) => {
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
				<div>
					<input type="text" placeholder="Group" value={this.state.newGroupName} onChange={this.onNewGroupNameChange} />
					<button onClick={this.addGroup}>Add Group</button>
				</div>
				<button onClick={this.saveCircuit}>Save Circuit</button>
			</div>
		);
	}
}

const mapDispatchToProps = (dispatch: Dispatch<ISelectorAction>) => ({
	addCircuit: (circuit: Circuit) => dispatch(addCircuit(circuit)),
});

const mapStateToProps = (state: ISelectorReducerState) => {
	return {
		exercises: state.exercises,
	};
};
export const ConnectedAddCircuitPage = connect(mapStateToProps, mapDispatchToProps)(AddCircuitPage);
