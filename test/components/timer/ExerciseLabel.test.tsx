import React from 'react';
import { shallow } from 'enzyme';
import { ExerciseLabel } from '../../../src/components/timer/ExerciseLabel';
import { FlattenedExercise } from '../../../src/types/circuits';

describe('Given ExerciseLabel', () => {
	const testValues = [
		[
			{ 
				id: '1', 
				name: 'Push Ups', 
				description: 'Up and Down', 
				duration: 20, 
				count: 10, 
				groupName: '50 Push Ups', 
				groupRepIndex: 1, 
				groupRepetitions: 5, 
				circuitId: '1', 
				circuitName: '50 Push Ups', 
				circuitRepIndex: 1, 
				circuitRepetition: 1, 
				rest: 40 
			},
			true
		],
		[
			{
				id: '0',
				name: 'Push Ups',
				description: 'Take a break',
				duration: 40,
				count: 1,
				groupName: '50 Push Ups',
				groupRepIndex: 3,
				groupRepetitions: 5,
				circuitId: '0',
				circuitName: '50 Push Ups',
				circuitRepIndex: 1,
				circuitRepetition: 1,
				rest: 20,
			},
			false
		],
	];

	test.each(testValues)('When interval is %o, and resting is %s', (exercise: FlattenedExercise, resting: boolean) => {
		const render = shallow(<ExerciseLabel exercise={exercise} isResting={resting} />);
		expect(render).toMatchSnapshot();
	});
});
