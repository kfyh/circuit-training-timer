import React from 'react';
import { shallow } from 'enzyme';
import { App } from '../src/App';

test('When loading then title is Circuit Trainer Timer', () => {
	const render = shallow(<App />);
	expect(render).toMatchSnapshot();
});
