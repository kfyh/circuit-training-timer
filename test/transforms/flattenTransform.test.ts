import { StepCircuit, FlattenedStepCircuit } from '../../src/types/circuits';
import { flattenSteps } from '../../src/transforms/flattenTransform';

const steps1: StepCircuit = [
    { label: 'Burpies', time: 60, reps: 3, type: 'exercise' },
    { label: 'Push Ups', time: 60, reps: 3, type: 'exercise' },
    { label: 'Sits Ups', time: 60, reps: 3, type: 'exercise' },
    { label: 'Rest', time: 120, reps: 1, type: 'rest' },
];

test('When loading then title is Circuit Trainer Timer', () => {
	const result = flattenSteps(steps1);
	expect(result).toStrictEqual([
        {id: expect.anything(), label: 'Burpies', time: 60, repIndex: 1, repTotal: 3, type: 'exercise'},
        {id: expect.anything(), label: 'Burpies', time: 60, repIndex: 2, repTotal: 3, type: 'exercise'},
        {id: expect.anything(), label: 'Burpies', time: 60, repIndex: 3, repTotal: 3, type: 'exercise'},
        {id: expect.anything(), label: 'Push Ups', time: 60, repIndex: 1, repTotal: 3, type: 'exercise'},
        {id: expect.anything(), label: 'Push Ups', time: 60, repIndex: 2, repTotal: 3, type: 'exercise'},
        {id: expect.anything(), label: 'Push Ups', time: 60, repIndex: 3, repTotal: 3, type: 'exercise'},
        {id: expect.anything(), label: 'Sits Ups', time: 60, repIndex: 1, repTotal: 3, type: 'exercise'},
        {id: expect.anything(), label: 'Sits Ups', time: 60, repIndex: 2, repTotal: 3, type: 'exercise'},
        {id: expect.anything(), label: 'Sits Ups', time: 60, repIndex: 3, repTotal: 3, type: 'exercise'},
        {id: expect.anything(), label: 'Rest', time: 120, repIndex: 1, repTotal: 1, type: 'rest'},
    ]);
});
