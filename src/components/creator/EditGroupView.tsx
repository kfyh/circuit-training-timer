import React, { ReactElement } from 'react';
import { GroupExerciseForm } from './GroupExerciseForm';

type EditGroupViewProps = {

};

export class EditGroupView extends React.Component<EditGroupViewProps> {
	public render(): ReactElement {
		return (
			<div>
				<h1>Edit Group</h1>
				<form id="group_form">
					<input type="text" placeholder="Name" autoFocus />
					<GroupExerciseForm exerciseId="1" onChange={() => {}} />
					<div>
						<label htmlFor="exercise">Add an exercise:</label>
						<input list="exercises" name="exercise" id="exercise" />
						<datalist id="exercises">
							<option value="Push Ups" />
							<option value="Sits Ups" />
							<option value="Squats" />
							<option value="Pull Ups" />
							<option value="Burpies" />
						</datalist>
						<button>Add Exercise</button>
					</div>
				</form>
			</div>
		);
	}
}
