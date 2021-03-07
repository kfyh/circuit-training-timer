import React from 'react';
import { shallow } from 'enzyme';
import { CircuitListView } from '../../../src/components/selector/';
import { circuit } from '../../fixtures/exerciseFixtures';

test('Given CircuitListView, it renders correctly', () => {
	const render = shallow(<CircuitListView circuits={[circuit]} onSelect={jest.fn()} />);
	expect(render).toMatchSnapshot();
});
