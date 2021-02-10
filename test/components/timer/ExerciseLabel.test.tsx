import React from 'react';
import { shallow } from 'enzyme';
import { ExerciseLabel } from '../../../src/components/timer/ExerciseLabel';

describe('Given ExerciseLabel', () => {
	const testValues = [
		[{ label: 'Hello', reps: 3 }, 1, 'Hello (1/3)'],
		[{ label: 'Push Ups', reps: 1 }, 1, 'Push Ups (1/1)'],
	];

	test.each(testValues)('When interval is %o, rep is %i then label is %s', (interval, currentRep, expected) => {
		const render = shallow(<ExerciseLabel interval={interval} currentRep={currentRep} />);
		expect(render).toMatchSnapshot();
	});
});
