import React from 'react';
import { shallow } from 'enzyme';
import { TimeLabel } from '../../../src/components/timer/TimeLabel';

describe('Given TimeLabel', () => {
	const testValues = [
		[1000, 1],
		[1499, 2],
		[0, 0],
		[-1, 0],
		[100000, 0],
	];

	test.each(testValues)('When render with time %i then show %i sec', (value, expected) => {
		const render = shallow(<TimeLabel time={value} />);
		expect(render).toMatchSnapshot();
	});
});
