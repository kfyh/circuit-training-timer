import { Circuit, Exercise } from '../../src/types/circuits';
import { ISelectorReducerState } from '../../src/reducers/selectorReducer';

export const circuit: Circuit = {
	id: '0',
	name: 'circuit',
	exerciseGroups: [],
	repetitions: 1,
};

export const exercise: Exercise = {
	id: '0',
	name: 'exercise',
};

export const existingState: ISelectorReducerState = {
	circuits: [{ id: '0', name: 'existing ciruit', exerciseGroups: [], repetitions: 1 }],
	exercises: [{ id: '0', name: 'existing exercise' }],
	currentCircuit: { id: '0', name: 'default', exerciseGroups: [], repetitions: 1 },
};

export const emptyState: ISelectorReducerState = {
	circuits: [],
	exercises: [],
	currentCircuit: { id: '0', name: 'default', exerciseGroups: [], repetitions: 1 },
};
