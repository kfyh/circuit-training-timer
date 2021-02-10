import { FlattenedStepCircuit, StepCircuit, StepType } from '../types/circuits';

export const flattenSteps = (steps: StepCircuit): FlattenedStepCircuit => {
	const result: FlattenedStepCircuit = [];
	const length = steps.length;
	for (let i = 0; i < length; i++) {
		if (steps[i].steps) {
			result.push(...addChildSteps(steps[i], i + ''));
		} else {
			const { label, time, reps, type } = steps[i];
			for (let j = 1; j <= reps; j++) {
				const entry = { id: i + '-' + j, label, time, repIndex: j, repTotal: reps, type };
				result.push(entry);
			}
		}
	}
	return result;
};

const addChildSteps = (step: StepType, id: string): FlattenedStepCircuit => {
	const result: FlattenedStepCircuit = [];
	for (let i = 1; i <= step.reps; i++) {
		const length = step.steps!.length;
		for (let j = 0; j < length; j++) {
			const { label, time, reps, type } = step.steps![j];
			for (let k = 1; k <= reps; k++) {
				const entry = {
					id: id + '-' + j + '-' + k,
					label,
					time,
					repIndex: k,
					repTotal: reps,
					type,
					parentId: id,
					parentLabel: step.label,
					parentRepIndex: i,
					parentRepTotal: step.reps,
					parentType: step.type,
				};
				result.push(entry);
			}
		}
	}

	return result;
};
