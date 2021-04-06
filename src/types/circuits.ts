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
	name: string;
	exercises: Array<{
		exerciseId: string;
		duration: number;
		count: number;
		rest: number;
	}>;
	repetitions: number;
	rest: number;
};

export type Circuit = {
	id: string;
	name: string;
	exerciseGroups: Array<ExerciseGroup>;
	repetitions: number;
};

export type FlattenedCircuit = Array<FlattenedExercise>;

export type FlattenedExercise = {
	id: string;
	name: string;
	description?: string;
	duration: number;
	count?: number;
	groupName: string;
	groupRepIndex: number;
	groupRepetitions: number;
	circuitId: string;
	circuitName: string;
	circuitRepIndex: number;
	circuitRepetition: number;
	rest: number;
};

export const NullCircuit: Circuit = {
	id: 'nullId',
	name: 'null',
	exerciseGroups: [],
	repetitions: 1,
};

export const NullExercise: Exercise = {
	id: '0',
	name: 'null',
};

export const NullFlattenedExercise: FlattenedExercise = {
	id: '',
	name: 'null',
	duration: 0,
	groupName: 'null',
	groupRepIndex: 0,
	groupRepetitions: 0,
	circuitId: '',
	circuitName: 'null',
	circuitRepIndex: 0,
	circuitRepetition: 0,
	rest: 0,
};
