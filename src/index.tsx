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
			name: '10 Push Ups',
			description: 'Up and Down',
		},
		{
			id: '2',
			name: '10 Sits Ups',
			description: 'Up and Down',
		},
		{
			id: '3',
			name: '10 Squats',
			description: 'Up and Down',
		},
		{
			id: '4',
			name: '10 Pull Ups',
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
			name: `Climber's Challenge`,
			exercises: [
				{
					exerciseId: '1',
					duration: 20,
					count: 10,
				},
				{
					exerciseId: '2',
					duration: 20,
					count: 10,
				},
				{
					exerciseId: '3',
					duration: 20,
					count: 10,
				},
				{
					exerciseId: '4',
					duration: 20,
					count: 10,
				},
				{
					exerciseId: '0',
					duration: 30,
					count: 1,
				},
			],
			repetitions: 10,
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
	addCircuit({
		id: '1',
		name: `Climber's Challenge`,
		exerciseGroups: [
			{
				id: '1',
				name: '50 Push Ups',
				exerciseGroupId: '2',
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
				name: '100 Push Ups, Sit Ups, Squats, Pull Ups',
				exerciseGroupId: '2',
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
