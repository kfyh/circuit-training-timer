export type Step = {
	label: string;
	time: number;
	reps: number;
	type: string;
	steps?: Array<Step>;
};

export type StepCircuit = Array<Step>;

export const NullStep = {
	label: 'null',
	time: 0,
	reps: 0,
	type: 'null',
	steps: undefined,
};

export type FlattenedStep = {
	id: string;
	label: string;
	time: number;
	repIndex: number;
	repTotal: number;
	type: string;
	parentId?: string;
	parentLabel?: string;
	parentType?: string;
	parentRepIndex?: number;
	parentRepTotal?: number;
};

export type FlattenedStepCircuit = Array<FlattenedStep>;

export const NullFlattenedStep = {
	id: '',
	label: 'null',
	time: 0,
	repIndex: 0,
	repTotal: 0,
	type: 'null',
	parentId: undefined,
	parentLabel: undefined,
	parentType: undefined,
	parentRepIndex: undefined,
	parentRepTotal: undefined,
};

export type Exercise = {
	id: string;
	name: string;
	description?: string;
};

export type ExerciseGroup = {
	id: string;
	name: string;
	exercises: Array<{
		exerciseId: string;
		duration?: number;
		count?: number;
	}>;
	repetitions: number;
};

export type Circuit = {
	id: string;
	name: string;
	exerciseGroups: Array<{
		id: string;
		name: string;
		exerciseGroupId: string;
	}>;
	repetitions: number;
};
