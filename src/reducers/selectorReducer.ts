import { Circuit, Exercise, ExerciseGroup } from '../types/circuits';

export enum ACTION_TYPES {
	ADD_EXERCISE = 'ADD_EXERCISE',
	ADD_EXERCISE_GROUP = 'ADD_EXERCISE_GROUP',
	ADD_CIRCUIT = 'ADD_CIRCUIT',
	SELECT_CIRCUIT = 'SELECT_CIRCUIT',
}

export interface ISelectorAction {
	type: ACTION_TYPES;
	circuit?: Circuit;
	exercises?: Array<Exercise>;
	exerciseGroups?: Array<ExerciseGroup>;
}

export interface ISelectorReducerState {
	circuits: Array<Circuit>;
	exerciseGroups: Array<ExerciseGroup>;
	exercises: Array<Exercise>;
	currentCircuit: Circuit;
}

const selectorReducerDefaultState = {
	circuits: [],
	exerciseGroups: [],
	exercises: [],
	currentCircuit: { id: '0', name: 'default', exerciseGroups: [], repetitions: 1 },
};

export const selectorReducer = (state: ISelectorReducerState = selectorReducerDefaultState, action: ISelectorAction): ISelectorReducerState => {
	switch (action.type) {
		case ACTION_TYPES.ADD_EXERCISE:
			if (action.exercises === undefined) {
				return state;
			}
			const exercises = [...state.exercises, ...action.exercises];
			return {
				...state,
				exercises,
			};
		case ACTION_TYPES.ADD_EXERCISE_GROUP:
			if (action.exerciseGroups === undefined) {
				return state;
			}
			const exerciseGroups = [...state.exerciseGroups, ...action.exerciseGroups];
			return {
				...state,
				exerciseGroups,
			};
		case ACTION_TYPES.ADD_CIRCUIT:
			if (action.circuit === undefined) {
				return state;
			}
			const circuits = [...state.circuits, action.circuit];
			return {
				...state,
				circuits,
			};
		case ACTION_TYPES.SELECT_CIRCUIT:
			if (action.circuit === undefined) {
				return state;
			}
			return {
				...state,
				currentCircuit: action.circuit,
			};
		default:
			return state;
	}
};
