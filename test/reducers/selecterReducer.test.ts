import { ACTION_TYPES, ISelectorAction, ISelectorReducerState, selectorReducer } from '../../src/reducers/selectorReducer';
import { circuit, exercise, exerciseGroup, existingState } from '../fixtures/exerciseFixtures';



describe('When add exercise', () =>{
    test('given exercises, then exercise added to state', () => {
        const addExerciseAction: ISelectorAction = {
            type: ACTION_TYPES.ADD_EXERCISE,
            exercises: [exercise],
        };
    
        const result = selectorReducer(undefined, addExerciseAction);
        expect(result.exercises).toStrictEqual([exercise]);
    });

    test('given no exercises, then state remains the same', () => {
        const addExerciseAction: ISelectorAction = {
            type: ACTION_TYPES.ADD_EXERCISE,
        };
    
        const result = selectorReducer(existingState, addExerciseAction);
        expect(result).toStrictEqual(existingState);
    });

});

describe('When add circuit', () => {
    test('Given circuit, then circuit added to state', () => {
        const action: ISelectorAction = {
            type: ACTION_TYPES.ADD_CIRCUIT,
            circuit
        };
    
        const result = selectorReducer(undefined, action);
        expect(result.circuits).toStrictEqual([circuit]);
    });

    test('Given no circuit, then state stays the same', () => {
        const action: ISelectorAction = {
            type: ACTION_TYPES.ADD_CIRCUIT
        };
    
        const result = selectorReducer(existingState, action);
        expect(result).toStrictEqual(existingState);
    });
});

describe('When select circuit', () => {
    test('given circuit, then circuit selected', () => {
        const action: ISelectorAction = {
            type: ACTION_TYPES.SELECT_CIRCUIT,
            circuit
        };
    
        const result = selectorReducer(undefined, action);
        expect(result.currentCircuit).toStrictEqual(circuit);
    });

    test('given no circuit, then state stays the same', () => {
        const action: ISelectorAction = {
            type: ACTION_TYPES.SELECT_CIRCUIT
        };
    
        const result = selectorReducer(existingState, action);
        expect(result).toStrictEqual(existingState);
    });

});
