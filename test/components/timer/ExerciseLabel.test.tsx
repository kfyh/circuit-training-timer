import React from 'react';
import { shallow } from 'enzyme';
import { ExerciseLabel } from '../../../src/components/timer/ExerciseLabel';

describe('Given ExerciseLabel', () => {
	const testValues = [
		[{ id: '0', label: 'Burpies', time: 60, repIndex: 1, repTotal: 3, type: 'exercise' }, 1, 'Burpies (1/3)'],
		[{ id: expect.anything(), label: 'Push Ups', time: 60, repIndex: 2, repTotal: 5, type: 'exercise' }, 1, 'Push Ups (2/5)'],
		[
			{
				id: expect.anything(),
				label: 'Hang for 7 secs',
				time: 7,
				repIndex: 1,
				repTotal: 1,
				type: 'exercise',
				parentId: expect.anything(),
				parentLabel: 'Finger Training',
				parentType: 'set',
				parentRepIndex: 2,
				parentRepTotal: 5,
			},
			1,
			'',
		],
	];

	test.each(testValues)('When interval is %o, rep is %i then label is %s', (step, currentRep, expected) => {
		const render = shallow(<ExerciseLabel step={step} />);
		expect(render).toMatchSnapshot();
	});
});
