import React from 'react';
import { shallow } from 'enzyme';
import { StartStopButton } from '../../../src/components/timer/StartStopButton';

describe('Given StartStopButton', () => {
	const testValues = [
		[true, 'Stop'],
		[false, 'Start'],
	];

	test.each(testValues)('When isRunning is %b then button label is %s', (value, expected) => {
		const render = shallow(<StartStopButton isRunning={value} />);
		expect(render).toMatchSnapshot();
	});
});
