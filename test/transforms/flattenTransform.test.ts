import { StepCircuit } from '../../src/types/circuits';
import { flattenSteps } from '../../src/transforms/flattenTransform';

const steps1: StepCircuit = [
    { label: 'Burpies', time: 60, reps: 3, type: 'exercise' },
    { label: 'Push Ups', time: 60, reps: 3, type: 'exercise' },
    { label: 'Sits Ups', time: 60, reps: 3, type: 'exercise' },
    { label: 'Rest', time: 120, reps: 1, type: 'rest' },
];


const steps2: StepCircuit = [
    { label: 'Burpies', time: 5, reps: 3, type: 'exercise' },
    {
        label: 'Finger Training',
        time: 10,
        reps: 5,
        type: 'set',
        steps: [
            { label: 'Hang for 7 secs', time: 7, reps: 1, type: 'exercise' },
            { label: 'Break and Recover', time: 3, reps: 1, type: 'break' },
        ],
    },
    { label: 'Finished', time: 5, reps: 1, type: 'prep' },
];

test('When flatten steps then flattened correctly', () => {
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

test('When flatten steps with steps then flattened correctly', () => {
	const result = flattenSteps(steps2);
	expect(result).toStrictEqual([
        {id: expect.anything(), label: 'Burpies', time: 5, repIndex: 1, repTotal: 3, type: 'exercise'},
        {id: expect.anything(), label: 'Burpies', time: 5, repIndex: 2, repTotal: 3, type: 'exercise'},
        {id: expect.anything(), label: 'Burpies', time: 5, repIndex: 3, repTotal: 3, type: 'exercise'},
        {id: expect.anything(), label: 'Hang for 7 secs', time: 7, repIndex: 1, repTotal: 1, type: 'exercise', parentId: expect.anything(),  parentLabel: 'Finger Training', parentType: 'set',	parentRepIndex: 1, parentRepTotal: 5 },
        {id: expect.anything(), label: 'Break and Recover', time: 3, repIndex: 1, repTotal: 1, type: 'break', parentId: expect.anything(),  parentLabel: 'Finger Training', parentType: 'set', parentRepIndex: 1, parentRepTotal: 5 },
        {id: expect.anything(), label: 'Hang for 7 secs', time: 7, repIndex: 1, repTotal: 1, type: 'exercise', parentId: expect.anything(),  parentLabel: 'Finger Training', parentType: 'set',	parentRepIndex: 2, parentRepTotal: 5 },
        {id: expect.anything(), label: 'Break and Recover', time: 3, repIndex: 1, repTotal: 1, type: 'break', parentId: expect.anything(),  parentLabel: 'Finger Training', parentType: 'set', parentRepIndex: 2, parentRepTotal: 5 },
        {id: expect.anything(), label: 'Hang for 7 secs', time: 7, repIndex: 1, repTotal: 1, type: 'exercise', parentId: expect.anything(),  parentLabel: 'Finger Training', parentType: 'set',	parentRepIndex: 3, parentRepTotal: 5 },
        {id: expect.anything(), label: 'Break and Recover', time: 3, repIndex: 1, repTotal: 1, type: 'break', parentId: expect.anything(),  parentLabel: 'Finger Training', parentType: 'set', parentRepIndex: 3, parentRepTotal: 5 },
        {id: expect.anything(), label: 'Hang for 7 secs', time: 7, repIndex: 1, repTotal: 1, type: 'exercise', parentId: expect.anything(),  parentLabel: 'Finger Training', parentType: 'set',	parentRepIndex: 4, parentRepTotal: 5 },
        {id: expect.anything(), label: 'Break and Recover', time: 3, repIndex: 1, repTotal: 1, type: 'break', parentId: expect.anything(),  parentLabel: 'Finger Training', parentType: 'set', parentRepIndex: 4, parentRepTotal: 5 },
        {id: expect.anything(), label: 'Hang for 7 secs', time: 7, repIndex: 1, repTotal: 1, type: 'exercise', parentId: expect.anything(),  parentLabel: 'Finger Training', parentType: 'set',	parentRepIndex: 5, parentRepTotal: 5 },
        {id: expect.anything(), label: 'Break and Recover', time: 3, repIndex: 1, repTotal: 1, type: 'break', parentId: expect.anything(),  parentLabel: 'Finger Training', parentType: 'set', parentRepIndex: 5, parentRepTotal: 5 },
        {id: expect.anything(), label: 'Finished', time: 5, repIndex: 1, repTotal: 1, type: 'prep'},
    ]);
});
