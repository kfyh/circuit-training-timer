import { Circuit, Exercise, ExerciseGroup } from '../../src/types/circuits';
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

export const exerciseGroup: ExerciseGroup = {
	id: '0',
	name: 'exerciseGroup',
	exercises: [],
	repetitions: 0,
};

export const existingState: ISelectorReducerState = {
	circuits: [{ id: '0', name: 'existing ciruit', exerciseGroups: [], repetitions: 1 }],
	exerciseGroups: [{ id: '0', name: 'existing group', exercises: [], repetitions: 1 }],
	exercises: [{ id: '0', name: 'existing exercise' }],
	currentCircuit: { id: '0', name: 'default', exerciseGroups: [], repetitions: 1 },
};

export const emptyState: ISelectorReducerState = {
	circuits: [],
	exerciseGroups: [],
	exercises: [],
	currentCircuit: { id: '0', name: 'default', exerciseGroups: [], repetitions: 1 },
};
