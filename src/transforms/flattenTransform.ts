import { FlattenedStepCircuit, StepCircuit, Step, Circuit, ExerciseGroup, Exercise, FlattenedCircuit, NullFlattenedExercise } from '../types/circuits';

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

const addChildSteps = (step: Step, id: string): FlattenedStepCircuit => {
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

export const flattenCircuit = (circuit: Circuit, groups: Array<ExerciseGroup>, exercises: Array<Exercise>): FlattenedCircuit => {
	const result: FlattenedCircuit = [];

	const circuitId = circuit.id;
	const circuitName = circuit.name;
	const circuitRepetition = circuit.repetitions;

	const circuitGroups = circuit.exerciseGroups;
	const numGroups = circuitGroups.length;
	for (let circuitRepIndex = 1; circuitRepIndex <= circuitRepetition; circuitRepIndex++) {
		for (let groupIter = 0; groupIter < numGroups; groupIter++) {
			const groupId = circuitGroups[groupIter].exerciseGroupId;
			const group: ExerciseGroup | undefined = groups.find((value) => value.id === groupId);
			if (group !== undefined) {
				const groupName = group.name;
				const groupRepetitions = group.repetitions;
				const groupExercises = group.exercises;
				const numExercises = groupExercises.length;
				for (let groupRepIndex = 1; groupRepIndex <= groupRepetitions; groupRepIndex++) {
					for (let exerciseIter = 0; exerciseIter < numExercises; exerciseIter++) {
						const { exerciseId: id, duration, count } = groupExercises[exerciseIter];
						const exercise: Exercise | undefined = exercises.find((value) => value.id === id);
						if (exercise !== undefined) {
							const { name, description } = exercise;
							result.push({
								id,
								name,
								description,
								duration,
								count,
								groupId,
								groupName,
								groupRepIndex,
								groupRepetitions,
								circuitId,
								circuitName,
								circuitRepIndex,
								circuitRepetition,
							});
						} else {
							throw `Cannot find exercise ${id}`;
						}
					}
				}
			} else {
				throw `Cannot find exercise group ${groupId}`;
			}
		}
	}
	return result;
};
