import { FlattenedStepCircuit, StepCircuit } from '../types/circuits';

export const flattenSteps = (steps: StepCircuit): FlattenedStepCircuit => {
	const result: FlattenedStepCircuit = [];
	const length = steps.length;
	for (let i = 0; i < length; i++) {
		const { label, time, reps, type } = steps[i];
		if (reps > 1) {
			for (let j = 1; j <= reps; j++) {
				const entry = { id: i + '-' + j, label, time, repIndex: j, repTotal: reps, type };
				result.push(entry);
			}
		} else {
			const entry = { id: i + '', label, time, repIndex: 1, repTotal: reps, type };
			result.push(entry);
		}
	}
	return result;
};
