import React from 'react';
import { render } from '@testing-library/react';
import { ExerciseLabel } from './ExerciseLabel';

describe('Given ExerciseLabel', () => {
	const testValues = [
		[{ label: 'Hello', reps: 3 }, 1, 'Hello (1/3)'],
		[{ label: 'Push Ups', reps: 1 }, 1, 'Push Ups (1/1)'],
	];

	test.each(testValues)('When interval is %o, rep is %i then label is %s', (interval, currentRep, expected) => {
		const { getByText } = render(<ExerciseLabel interval={interval} currentRep={currentRep} />);
		const timeElement = getByText(expected);
		expect(timeElement).toBeInTheDocument();
	});
});
