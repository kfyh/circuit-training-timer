export type StepType = {
	label: string;
	time: number;
	reps: number;
	type: string;
	steps?: Array<StepType>;
};

export type StepCircuit = Array<StepType>;

export type ExerciseType = {
	id: string;
	name: string;
	description?: string;
};

export type ExerciseGroupType = {
	id: string;
	name: string;
	exercises: Array<{
		exerciseId: string;
		duration?: number;
		count?: number;
	}>;
	repetitions: number;
};

export type CircuitType = {
	id: string;
	name: string;
	exerciseGroups: Array<{
		id: string;
		name: string;
		exerciseGroupId: string;
	}>;
	repetitions: number;
};
