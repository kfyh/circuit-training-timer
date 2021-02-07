import { StepCircuit } from '../types/circuits';

export enum ACTION_TYPES {
	ADD_CIRCUIT = 'ADD_CIRCUIT',
	SELECT_CIRCUIT = 'SELECT_CIRCUIT',
}

export interface ISelectorAction {
	type: ACTION_TYPES;
	circuit: StepCircuit;
}

export interface ISelectorReducerState {
	circuits: Array<StepCircuit>;
	currentCircuit: StepCircuit;
}

const selectorReducerDefaultState = {
	circuits: [],
	currentCircuit: [
		{ label: 'Burpies', time: 5, reps: 3, type: 'exercise' },
		{
			label: 'Finger Training',
			time: 10,
			reps: 7,
			type: 'set',
			steps: [
				{ label: 'Hang for 7 secs', time: 7, reps: 1, type: 'exercise' },
				{ label: 'Break and Recover', time: 3, reps: 1, type: 'break' },
			],
		},
		{ label: 'Finished', time: 5, reps: 1, type: 'prep' },
	],
};

export const selectorReducer = (state: ISelectorReducerState = selectorReducerDefaultState, action: ISelectorAction): ISelectorReducerState => {
	switch (action.type) {
		case ACTION_TYPES.ADD_CIRCUIT:
			const circuits = [...state.circuits, action.circuit];
			return {
				...state,
				circuits,
			};
		case ACTION_TYPES.SELECT_CIRCUIT:
			return {
				...state,
				currentCircuit: action.circuit,
			};
		default:
			return state;
	}
};
