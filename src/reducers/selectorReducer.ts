const selectorReducerDefaultState = {
	currentCircuit: [
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
	],
};

export const selectorReducer = (state = selectorReducerDefaultState, action) => {
	return state;
};
