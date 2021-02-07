import React from 'react';
import { render } from '@testing-library/react';
import { TimeLabel } from './TimeLabel';

describe('Given TimeLabel', () => {
	const testValues = [
		[1000, 1],
		[1499, 2],
		[0, 0],
		[-1, 0],
	];

	test.each(testValues)('When render with time %i then show %i sec', (value, expected) => {
		const { getByText } = render(<TimeLabel time={value} />);
		const timeElement = getByText('Timer : ' + expected);
		expect(timeElement).toBeInTheDocument();
	});
});
