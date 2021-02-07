import { ACTION_TYPES } from '../reducers/selectorReducer';
import { StepCircuit } from '../types/circuits';
import { ISelectorAction } from '../reducers/selectorReducer';

export const addCircuit = (circuit: StepCircuit): ISelectorAction => ({
	type: ACTION_TYPES.ADD_CIRCUIT,
	circuit,
});

export const selectCircuit = (circuit: StepCircuit): ISelectorAction => ({
	type: ACTION_TYPES.SELECT_CIRCUIT,
	circuit,
});
