import React from 'react';
import { shallow } from 'enzyme';
import { TimeLabel } from '../../../src/components/timer/TimeLabel';

describe('Given TimeLabel', () => {
	const testValues = [
		[1000, true],
		[1499, false],
		[0, true],
		[-1, false],
		[35, false],
		[100000, true],
	];

	test.each(testValues)('When render with time %i and resting is %s', (value: number, resting: boolean) => {
		const render = shallow(<TimeLabel time={value} isResting={resting} />);
		expect(render).toMatchSnapshot();
	});
});
