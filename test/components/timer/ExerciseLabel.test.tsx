import React from 'react';
import { shallow } from 'enzyme';
import { ExerciseLabel } from '../../../src/components/timer/ExerciseLabel';

describe('Given ExerciseLabel', () => {
	const testValues = [
		[
			{
				id: '0',
				name: 'Push Ups',
				description: 'Up and Down',
				duration: 20,
				count: 10,
				groupId: '0',
				groupName: '50 Push Ups',
				groupRepIndex: 1,
				groupRepetitions: 5,
				circuitId: '0',
				circuitName: '50 Push Ups',
				circuitRepIndex: 1,
				circuitRepetition: 1,
			},
			1,
			'Burpies (1/3)',
		],
		[
			{
				id: '0',
				name: 'Rest',
				description: 'Take a break',
				duration: 40,
				count: 1,
				groupId: '0',
				groupName: '50 Push Ups',
				groupRepIndex: 3,
				groupRepetitions: 5,
				circuitId: '0',
				circuitName: '50 Push Ups',
				circuitRepIndex: 1,
				circuitRepetition: 1,
			},
			1,
			'Push Ups (2/5)',
		],
	];

	test.each(testValues)('When interval is %o, rep is %i then label is %s', (exercise, currentRep, expected) => {
		const render = shallow(<ExerciseLabel exercise={exercise} />);
		expect(render).toMatchSnapshot();
	});
});
