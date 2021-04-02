import { Circuit, Exercise, ExerciseGroup } from '../types/circuits';

export enum ACTION_TYPES {
	ADD_EXERCISE = 'ADD_EXERCISE',
	EDIT_EXERCISE = 'EDIT_EXERCISE',
	ADD_CIRCUIT = 'ADD_CIRCUIT',
	SELECT_CIRCUIT = 'SELECT_CIRCUIT',
}

export interface ISelectorAction {
	type: ACTION_TYPES;
	circuit?: Circuit;
	exercise?: Exercise;
	exercises?: Array<Exercise>;
	exerciseGroups?: Array<ExerciseGroup>;
}

export interface ISelectorReducerState {
	circuits: Array<Circuit>;
	exercises: Array<Exercise>;
	currentCircuit: Circuit;
}

const selectorReducerDefaultState = {
	circuits: [],
	exercises: [],
	currentCircuit: { id: '0', name: 'default', exerciseGroups: [], repetitions: 1 },
};

export const selectorReducer = (state: ISelectorReducerState = selectorReducerDefaultState, action: ISelectorAction): ISelectorReducerState => {
	switch (action.type) {
		case ACTION_TYPES.ADD_EXERCISE:
			if (action.exercises === undefined) {
				return state;
			}
			return {
				...state,
				exercises: [...state.exercises, ...action.exercises],
			};
		case ACTION_TYPES.EDIT_EXERCISE:
			if (action.exercise) {
				const edited = action.exercise;
				return {
					...state,
					exercises: state.exercises.map<Exercise>((exercise) => {
						return exercise.id === edited.id ? edited : exercise;
					}),
				};
			} else {
				return state;
			}
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
