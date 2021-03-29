import { ACTION_TYPES } from '../reducers/selectorReducer';
import { Circuit, Exercise } from '../types/circuits';
import { ISelectorAction } from '../reducers/selectorReducer';

export const addCircuit = (circuit: Circuit): ISelectorAction => ({
	type: ACTION_TYPES.ADD_CIRCUIT,
	circuit,
});

export const selectCircuit = (circuit: Circuit): ISelectorAction => ({
	type: ACTION_TYPES.SELECT_CIRCUIT,
	circuit,
});

export const addExercise = (exercise: Exercise | Array<Exercise>): ISelectorAction => {
	let exercises: Array<Exercise> = [];
	if (Array.isArray(exercise)) {
		exercises = exercise;
	} else {
		exercises = [exercise];
	}

	return {
		type: ACTION_TYPES.ADD_EXERCISE,
		exercises,
	};
};

export const editExercise = (exercise: Exercise): ISelectorAction => {
	return {
		type: ACTION_TYPES.EDIT_EXERCISE,
		exercise,
	};
};
