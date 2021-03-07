import { addCircuit, selectCircuit, addExercise } from '../../src/actions/selectorActions';
import { ACTION_TYPES } from '../../src/reducers/selectorReducer';
import { circuit, exercise, exerciseGroup } from '../fixtures/exerciseFixtures';

test('When add Circuit, then correct action returned', () => {
    const result = addCircuit(circuit);
    expect(result).toStrictEqual({
        type: ACTION_TYPES.ADD_CIRCUIT,
        circuit
    });
});

test('When select Circuit, then correct action returned', () => {
    const result = selectCircuit(circuit);
    expect(result).toStrictEqual({
        type: ACTION_TYPES.SELECT_CIRCUIT,
        circuit
    });
});

test('When add Exercise, then correct action returned', () => {
    const result = addExercise(exercise);
    expect(result).toStrictEqual({
        type: ACTION_TYPES.ADD_EXERCISE,
        exercises: [exercise],
    });
});

test('When add Exercises, then correct action returned', () => {
    const result = addExercise([exercise, exercise]);
    expect(result).toStrictEqual({
        type: ACTION_TYPES.ADD_EXERCISE,
        exercises: [exercise, exercise],
    });
});
