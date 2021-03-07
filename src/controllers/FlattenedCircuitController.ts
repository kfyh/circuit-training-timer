import { FlattenedCircuit, FlattenedExercise, NullFlattenedExercise } from '../types/circuits';

export type UpdateValues = {
	isComplete: boolean;
	isRunning: boolean;
	isResting: boolean;
	index: number;
	endTime: number;
	timeLeft: number;
};

export class FlattenedCircuitController {
	private steps: FlattenedCircuit;
	private isRunning: boolean;
	private isResting: boolean;

	private timeLeft = -1;
	private endTime = -1;
	private index = -1;
	private step: FlattenedExercise = NullFlattenedExercise;

	constructor(flattenedSteps: FlattenedCircuit) {
		this.steps = flattenedSteps;
		this.isRunning = false;
		this.isResting = false;
	}

	public start = (currentTime: number): number => {
		this.index = 0;
		this.step = this.steps[this.index];
		this.timeLeft = this.step.duration * 1000;
		this.endTime = currentTime + this.timeLeft;
		this.isRunning = true;
		this.isResting = false;
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
			if (this.isResting) {
				this.isResting = false;
				isComplete = this.setNextStep(currentTime);
			} else if (this.step.rest > 0) {
				this.isResting = true;
				this.timeLeft = this.step.rest * 1000;
				this.endTime = currentTime + this.timeLeft;
			} else {
				isComplete = this.setNextStep(currentTime);
			}
		} else {
			this.timeLeft = endTime - currentTime;
		}

		return {
			isComplete: isComplete,
			isRunning: this.isRunning,
			isResting: this.isResting,
			index: this.index,
			endTime: this.endTime,
			timeLeft: this.timeLeft,
		};
	};

	private setNextStep(currentTime: number): boolean {
		let isComplete = false;
		if (this.index < this.steps.length - 1) {
			this.index++;
			this.step = this.steps[this.index];
			this.timeLeft = this.step.duration * 1000;
			this.endTime = currentTime + this.timeLeft;
		} else {
			isComplete = true;
			this.isRunning = false;
		}

		return isComplete;
	}
}
