import React, { ReactElement } from 'react';
import { connect } from 'react-redux';
import { StartStopButton, TimeLabel, ExerciseLabel } from './timer';
import { StepIntervalController, SetIntervalController } from '../controllers';

type CircuitTimerProps = {
	intervals: Array<object>;
};

type CircuitTimerState = {
	controller: any;
	currentIntervalIndex: number;
	currentIntervalRep: number;
	currentStepIndex: number;
	currentStepRep: number;
	isRunning: boolean;
	endTime: number;
	timeLeft: number;
}
export class CircuitTimer extends React.Component<CircuitTimerProps, CircuitTimerState> {
	private timer = NaN;

	constructor(props: CircuitTimerProps) {
		super(props);

		this.state = {
			controller: null,
			currentIntervalIndex: 0,
			currentIntervalRep: 1,
			currentStepIndex: 0,
			currentStepRep: 1,
			isRunning: false,
			endTime: 0,
			timeLeft: 0,
		};
	}

	public componentWillUnmount(): void {
		this.stopTimer();
	}

	public render(): ReactElement {
		let currentInterval = this.props.intervals[this.state.currentIntervalIndex];
		const currentRep = this.state.currentIntervalRep;
		if (currentInterval.type === 'set') {
			currentInterval = currentInterval.steps[this.state.currentStepIndex];
		}

		return (
			<div>
				<ExerciseLabel interval={currentInterval} currentRep={currentRep} />
				<TimeLabel time={this.state.timeLeft} />
				<StartStopButton isRunning={this.state.isRunning} onClick={this.handleClick} />
			</div>
		);
	}

	private handleClick = (): void => {
		if (this.state.isRunning) {
			this.stopTimer();
		} else {
			this.startTimer();
		}
	};

	private startTimer = (): void => {
		if (this.state.isRunning) {
			return;
		}
		let controller = this.state.controller;
		let timeLeft = this.state.timeLeft;
		if (controller === null) {
			const interval = this.props.intervals[this.state.currentIntervalIndex];
			if (interval.type === 'set') {
				controller = new SetIntervalController(interval);
			} else {
				controller = new StepIntervalController(interval);
			}
			controller.start(Date.now());
			timeLeft = controller.timeLeft;
		} else {
			controller.resume(Date.now());
			timeLeft = controller.timeLeft;
		}

		this.setState({
			controller: controller,
			isRunning: true,
			endTime: Date.now() + timeLeft,
		});

		this.timer = setInterval(this.update, 100);
	};

	private stopTimer = (): void => {
		if (this.state.isRunning) {
			this.setState({
				isRunning: false,
			});
			this.state.controller.pause();
			clearInterval(this.timer);
		}
	};

	private update = (): void => {
		const values = this.state.controller.update(Date.now());
		if (values.isComplete) {
			const currentIntervalIndex = this.state.currentIntervalIndex + 1;
			if (currentIntervalIndex >= this.props.intervals.length) {
				this.endTimer();
			} else {
				this.setNextInterval(currentIntervalIndex);
			}
		} else {
			this.setState({
				timeLeft: values.timeLeft,
				currentIntervalRep: values.reps,
				currentStepIndex: values.currentStepIndex ? values.currentStepIndex : 0,
			});
		}
	};

	private endTimer = (): void => {
		clearInterval(this.timer);
		this.setState({
			controller: null,
			currentIntervalIndex: 0,
			currentIntervalRep: 1,
			currentStepIndex: 0,
			currentStepRep: 1,
			isRunning: false,
			endTime: 0,
			timeLeft: 0,
		});
		this.props.history.push('/');
	};

	setNextInterval = (interval) => {
		const nextInterval = this.props.intervals[interval];
		let nextController;
		if (nextInterval.type === 'set') {
			nextController = new SetIntervalController(nextInterval);
		} else {
			nextController = new StepIntervalController(nextInterval);
		}
		nextController.start(Date.now());
		this.setState({
			controller: nextController,
			timeLeft: nextController.timeLeft,
			currentIntervalIndex: interval,
			currentIntervalRep: nextController.reps,
			endTime: nextController.endTime,
		});
	};
}

const mapStateToProps = (state) => {
	return {
		intervals: state.currentCircuit,
	};
};

export const ConnectedCircuitTimer = connect(mapStateToProps)(CircuitTimer);
