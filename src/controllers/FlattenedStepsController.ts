import { FlattenedStepCircuit, FlattenedStep, NullFlattenedStep } from '../types/circuits';

export type UpdateValues = {
	isComplete: boolean;
	isRunning: boolean;
	stepIndex: number;
	endTime: number;
	timeLeft: number;
};

export class FlattenedStepsController {
	private steps: FlattenedStepCircuit;
	private isRunning: boolean;

	private timeLeft = -1;
	private endTime = -1;
	private stepIndex = -1;
	private step: FlattenedStep = NullFlattenedStep;

	constructor(flattenedSteps: FlattenedStepCircuit) {
		this.steps = flattenedSteps;
		this.isRunning = false;
	}

	public start = (currentTime: number): number => {
		this.stepIndex = 0;
		this.step = this.steps[this.stepIndex];
		this.timeLeft = this.step.time * 1000;
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
			if (this.stepIndex < this.steps.length - 1) {
				this.stepIndex++;
				this.step = this.steps[this.stepIndex];
				this.timeLeft = this.step.time * 1000;
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
			stepIndex: this.stepIndex,
			endTime: this.endTime,
			timeLeft: this.timeLeft,
		};
	};
}
