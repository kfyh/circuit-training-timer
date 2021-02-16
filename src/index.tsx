import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { AppRouter } from './router/AppRouter';
import './index.css';
import { configureStore } from './store/configureStore';
import { addCircuit, addExercise, addExerciseGroup, selectCircuit } from './actions/selectorActions';

const store = configureStore();

store.dispatch(
	addExercise([
		{
			id: '0',
			name: 'Rest',
			description: 'Take a break',
		},
		{
			id: '1',
			name: 'Push Ups',
			description: 'Up and Down',
		},
	])
);

store.dispatch(
	addExerciseGroup([
		{
			id: '0',
			name: 'Take a Break',
			exercises: [
				{
					exerciseId: '0',
					duration: 300,
					count: 1,
				},
			],
			repetitions: 1,
		},
		{
			id: '1',
			name: '50 Push Ups',
			exercises: [
				{
					exerciseId: '1',
					duration: 20,
					count: 10,
				},
				{
					exerciseId: '0',
					duration: 40,
					count: 1,
				},
			],
			repetitions: 5,
		},
		{
			id: '2',
			name: 'Missing Exercise',
			exercises: [
				{
					exerciseId: '99',
				},
			],
			repetitions: 1,
		},
	])
);

store.dispatch(
	addCircuit({
		id: '0',
		name: '50 Push Ups',
		exerciseGroups: [
			{
				id: '1',
				name: '50 Push Ups',
				exerciseGroupId: '1',
			},
		],
		repetitions: 1,
	})
);

store.dispatch(
	selectCircuit({
		id: '0',
		name: '50 Push Ups',
		exerciseGroups: [
			{
				id: '1',
				name: '50 Push Ups',
				exerciseGroupId: '1',
			},
		],
		repetitions: 1,
	})
);

const rootElement = document.createElement('div');
rootElement.setAttribute('id', 'root');
document.body.appendChild(rootElement);
const jsx = (
	<Provider store={store}>
		<AppRouter />
	</Provider>
);

ReactDOM.render(jsx, rootElement);
