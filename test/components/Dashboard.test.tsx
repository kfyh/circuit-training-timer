import React from 'react';
import { shallow } from 'enzyme';
import { createMemoryHistory } from 'history';
import { Dashboard } from '../../src/components/Dashboard';
import { Circuit } from '../../src/types/circuits';

const circuits: Array<Circuit> = [
	{
		id: '0',
		name: 'Circuit One',
		exerciseGroups: [],
		repetitions: 1,
	},
	{
		id: '1',
		name: 'Circuit Two',
		exerciseGroups: [],
		repetitions: 1,
	},
];
test('Given circuits, dashboard displays correctly', () => {
	const selectMock = jest.fn();
	const history = createMemoryHistory();
	const render = shallow(<Dashboard circuits={circuits} history={history} selectCircuit={selectMock} />);
	expect(render).toMatchSnapshot();
});

test.skip('When circuit selected then select Circuit called', () => {
	expect(true);
});

test.skip('When circuit selected then go to timer', () => {
	expect(true);
});
