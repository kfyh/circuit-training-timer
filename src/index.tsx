import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { AppRouter } from './router/AppRouter';
import './index.css';
import { configureStore } from './store/configureStore';
import { addCircuit, selectCircuit } from './actions/selectorActions';

const store = configureStore();

store.dispatch(
	addCircuit([
		{ label: 'Burpies', time: 60, reps: 3, type: 'exercise' },
		{ label: 'Push Ups', time: 60, reps: 3, type: 'exercise' },
		{ label: 'Sits Ups', time: 60, reps: 3, type: 'exercise' },
	])
);

store.dispatch(
	addCircuit([
		{ label: 'Burpies', time: 5, reps: 3, type: 'exercise' },
		{
			label: 'Finger Training',
			time: 10,
			reps: 7,
			type: 'set',
			steps: [
				{ label: 'Hang for 7 secs', time: 7, reps: 1, type: 'exercise' },
				{ label: 'Break and Recover', time: 3, reps: 1, type: 'break' },
			],
		},
		{ label: 'Finished', time: 5, reps: 1, type: 'prep' },
	])
);

store.dispatch(
	selectCircuit([
		{ label: 'Burpies', time: 5, reps: 3, type: 'exercise' },
		{
			label: 'Finger Training',
			time: 10,
			reps: 7,
			type: 'set',
			steps: [
				{ label: 'Hang for 7 secs', time: 7, reps: 1, type: 'exercise' },
				{ label: 'Break and Recover', time: 3, reps: 1, type: 'break' },
			],
		},
		{ label: 'Finished', time: 5, reps: 1, type: 'prep' },
	])
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
