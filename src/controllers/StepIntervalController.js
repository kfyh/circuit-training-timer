export class StepIntervalController {
	constructor(interval) {
		this.interval = interval;
		this.isRunning = false;
	}

	start = (currentTime) => {
		this.timeLeft = this.interval.time * 1000;
		this.endTime = currentTime + this.timeLeft;
		this.isRunning = true;
		this.reps = 1;
	};

	resume = (currentTime) => {
		this.isRunning = true;
		this.endTime = currentTime + this.timeLeft;
	};

	pause = () => {
		this.isRunning = false;
	};

	update = (currentTime) => {
		const endTime = this.endTime;
		let isComplete = false;
		if (endTime - currentTime <= 0) {
			if (this.reps < this.interval.reps) {
				this.reps++;
				this.timeLeft = this.interval.time * 1000;
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
			reps: this.reps,
			endTime: this.endTime,
			timeLeft: this.timeLeft,
		};
	};
}
