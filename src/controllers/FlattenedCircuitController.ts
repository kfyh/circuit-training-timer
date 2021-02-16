import { FlattenedCircuit, FlattenedExercise, NullFlattenedExercise } from '../types/circuits';

export type UpdateValues = {
	isComplete: boolean;
	isRunning: boolean;
	index: number;
	endTime: number;
	timeLeft: number;
};

export class FlattenedCircuitController {
	private steps: FlattenedCircuit;
	private isRunning: boolean;

	private timeLeft = -1;
	private endTime = -1;
	private index = -1;
	private step: FlattenedExercise = NullFlattenedExercise;

	constructor(flattenedSteps: FlattenedCircuit) {
		this.steps = flattenedSteps;
		this.isRunning = false;
	}

	public start = (currentTime: number): number => {
		this.index = 0;
		this.step = this.steps[this.index];
		this.timeLeft = this.step.duration * 1000;
		this.endTime = currentTime + this.timeLeft;
		this.isRunning = true;
		return this.timeLeft;
	};

	public resume = (currentTime: number): number => {
		this.isRunning = true;
		this.endTime = currentTime + this.timeLeft;
		return this.timeLeft;
	};

	public pause = (): void => {
		this.isRunning = false;
	};

	public update = (currentTime: number): UpdateValues => {
		const endTime = this.endTime;
		let isComplete = false;
		if (endTime - currentTime <= 0) {
			if (this.index < this.steps.length - 1) {
				this.index++;
				this.step = this.steps[this.index];
				this.timeLeft = this.step.duration * 1000;
				this.endTime = currentTime + this.timeLeft;
			} else {
				isComplete = true;
				this.isRunning = false;
			}
		} else {
			this.timeLeft = endTime - currentTime;
		}

		return {
			isComplete: isComplete,
			isRunning: this.isRunning,
			index: this.index,
			endTime: this.endTime,
			timeLeft: this.timeLeft,
		};
	};
}
