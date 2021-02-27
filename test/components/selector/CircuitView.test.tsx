import React from 'react';
import { shallow } from 'enzyme';
import { CircuitView } from '../../../src/components/selector/CircuitView';
import { circuit } from '../../fixtures/exerciseFixtures';

test('Given CircuitView, it renders correctly', () => {
	const render = shallow(<CircuitView circuit={circuit} onClick={jest.fn()} />);
	expect(render).toMatchSnapshot();
});

test('Given CircuitView, when button click, then onClick called', () => {
	const mockCallback = jest.fn();
	const render = shallow(<CircuitView circuit={circuit} onClick={mockCallback} />);

	const event = { preventDefault: () => {} };
	render.find('button').simulate('click', event);

	expect(mockCallback).toHaveBeenCalledWith(circuit);
});
