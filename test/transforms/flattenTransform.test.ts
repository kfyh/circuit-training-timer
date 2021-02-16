import { Circuit, Exercise, ExerciseGroup, StepCircuit } from '../../src/types/circuits';
import { flattenSteps, flattenCircuit } from '../../src/transforms/flattenTransform';

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

const exerciseCircuit1: Circuit = {
    id: '0',
    name: '50 Push Ups',
    exerciseGroups: [
        {
            id: '1',
            name: '50 Push Ups',
            exerciseGroupId: '1'
        }
    ],
    repetitions: 1
};

const exerciseCircuitNoGroup: Circuit = {
    id: '0',
    name: 'Missing Group',
    exerciseGroups: [
        {
            id: '1',
            name: 'Missing Group',
            exerciseGroupId: '99'
        }
    ],
    repetitions: 1
};

const exerciseCircuitNoExercise: Circuit = {
    id: '0',
    name: 'Missing Exercise',
    exerciseGroups: [
        {
            id: '1',
            name: 'Missing Exercise',
            exerciseGroupId: '2'
        }
    ],
    repetitions: 1
};

const exerciseGroups: Array<ExerciseGroup> = [
    {
        id: '0',
        name: 'Take a Break',
        exercises: [
            {
                exerciseId: '0',
                duration: 300,
                count: 1
            },
        ],
        repetitions: 1
    },
    {
        id: '1',
        name: '50 Push Ups',
        exercises: [
            {
                exerciseId: '1',
                duration: 20,
                count: 10
            },
            {
                exerciseId: '0',
                duration: 40,
                count: 1
            },
        ],
        repetitions: 5
    },
    {
        id: '2',
        name: 'Missing Exercise',
        exercises: [
            {
                exerciseId: '99',
                duration: 1,
            }
        ],
        repetitions: 1
    }
];

const exercises: Array<Exercise> = [
    {
        id: '0',
        name: 'Rest',
        description: 'Take a break'
    },
    {
        id: '1',
        name: 'Push Ups',
        description: 'Up and Down'
    },
];

test('When flatten circuit then flattened correctly', () => {
	const result = flattenCircuit(exerciseCircuit1, exerciseGroups, exercises);
	expect(result).toStrictEqual([
        { id: expect.anything(), name: 'Push Ups', description: 'Up and Down', duration: 20, count: 10, groupId: expect.anything(), groupName: '50 Push Ups', groupRepIndex: 1, groupRepetitions: 5, circuitId: expect.anything(), circuitName: '50 Push Ups', circuitRepIndex: 1, circuitRepetition: 1 },
        { id: expect.anything(), name: 'Rest', description: 'Take a break', duration: 40, count: 1, groupId: expect.anything(), groupName: '50 Push Ups', groupRepIndex: 1, groupRepetitions: 5, circuitId: expect.anything(), circuitName: '50 Push Ups', circuitRepIndex: 1, circuitRepetition: 1 },
        { id: expect.anything(), name: 'Push Ups', description: 'Up and Down', duration: 20, count: 10, groupId: expect.anything(), groupName: '50 Push Ups', groupRepIndex: 2, groupRepetitions: 5, circuitId: expect.anything(), circuitName: '50 Push Ups', circuitRepIndex: 1, circuitRepetition: 1 },
        { id: expect.anything(), name: 'Rest', description: 'Take a break', duration: 40, count: 1, groupId: expect.anything(), groupName: '50 Push Ups', groupRepIndex: 2, groupRepetitions: 5, circuitId: expect.anything(), circuitName: '50 Push Ups', circuitRepIndex: 1, circuitRepetition: 1 },
        { id: expect.anything(), name: 'Push Ups', description: 'Up and Down', duration: 20, count: 10, groupId: expect.anything(), groupName: '50 Push Ups', groupRepIndex: 3, groupRepetitions: 5, circuitId: expect.anything(), circuitName: '50 Push Ups', circuitRepIndex: 1, circuitRepetition: 1 },
        { id: expect.anything(), name: 'Rest', description: 'Take a break', duration: 40, count: 1, groupId: expect.anything(), groupName: '50 Push Ups', groupRepIndex: 3, groupRepetitions: 5, circuitId: expect.anything(), circuitName: '50 Push Ups', circuitRepIndex: 1, circuitRepetition: 1 },
        { id: expect.anything(), name: 'Push Ups', description: 'Up and Down', duration: 20, count: 10, groupId: expect.anything(), groupName: '50 Push Ups', groupRepIndex: 4, groupRepetitions: 5, circuitId: expect.anything(), circuitName: '50 Push Ups', circuitRepIndex: 1, circuitRepetition: 1 },
        { id: expect.anything(), name: 'Rest', description: 'Take a break', duration: 40, count: 1, groupId: expect.anything(), groupName: '50 Push Ups', groupRepIndex: 4, groupRepetitions: 5, circuitId: expect.anything(), circuitName: '50 Push Ups', circuitRepIndex: 1, circuitRepetition: 1 },
        { id: expect.anything(), name: 'Push Ups', description: 'Up and Down', duration: 20, count: 10, groupId: expect.anything(), groupName: '50 Push Ups', groupRepIndex: 5, groupRepetitions: 5, circuitId: expect.anything(), circuitName: '50 Push Ups', circuitRepIndex: 1, circuitRepetition: 1 },
        { id: expect.anything(), name: 'Rest', description: 'Take a break', duration: 40, count: 1, groupId: expect.anything(), groupName: '50 Push Ups', groupRepIndex: 5, groupRepetitions: 5, circuitId: expect.anything(), circuitName: '50 Push Ups', circuitRepIndex: 1, circuitRepetition: 1 },
    ]);
});

test('When flatten circuit with missing group error thrown', () => {
	expect(() => {
        flattenCircuit(exerciseCircuitNoGroup, exerciseGroups, exercises);
    }).toThrowError();
});

test('When flatten circuit with missing exercise error thrown', () => {
	expect(() => {
        flattenCircuit(exerciseCircuitNoExercise, exerciseGroups, exercises);
    }).toThrowError();
});