import { Circuit, Exercise } from '../types/circuits';

export type LocalState = {
	exercises: Array<Exercise>;
	circuits: Array<Circuit>;
};

export const loadState = (): LocalState | undefined => {
	try {
		const serializedState = localStorage.getItem('state');
		if (serializedState === null) {
			return undefined;
		}
		return JSON.parse(serializedState);
	} catch (err) {
		console.error(err);
		return undefined;
	}
};

export const saveState = (state: LocalState): void => {
	try {
		const serializedState = JSON.stringify(state);
		localStorage.setItem('state', serializedState);
	} catch {
		// ignore write errors
	}
};
