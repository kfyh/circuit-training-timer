import React, { ReactElement } from 'react';
import { connect } from 'react-redux';
import { StartStopButton, TimeLabel, ExerciseLabel } from './timer';
import { FlattenedCircuitController } from '../controllers';
import { History } from 'history';
import { FlattenedExercise, FlattenedCircuit } from '../types/circuits';
import { ISelectorReducerState } from '../reducers/selectorReducer';
import { flattenCircuit } from '../transforms/flattenTransform';

type CircuitTimerProps = {
	flattenedCircuit: FlattenedCircuit;
	history: History;
};

type CircuitTimerState = {
	currentIndex: number;
	hasStarted: boolean;
	isRunning: boolean;
	endTime: number;
	timeLeft: number;
};
export class CircuitTimer extends React.Component<CircuitTimerProps, CircuitTimerState> {
	private controller: FlattenedCircuitController;

	constructor(props: CircuitTimerProps) {
		super(props);

		this.controller = new FlattenedCircuitController(props.flattenedCircuit);
		this.state = {
			currentIndex: 0,
			hasStarted: false,
			isRunning: false,
			endTime: 0,
			timeLeft: 0,
		};
	}

	public componentWillUnmount(): void {
		this.stopTimer();
	}

	public render(): ReactElement {
		const exercise: FlattenedExercise = this.props.flattenedCircuit[this.state.currentIndex];

		return (
			<div>
				<ExerciseLabel exercise={exercise} />
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
		const controller = this.controller;
		let timeLeft = this.state.timeLeft;
		if (this.state.hasStarted) {
			timeLeft = controller.start(Date.now());
			this.setState(
				(state: CircuitTimerState): CircuitTimerState => {
					return { ...state, hasStarted: true };
				}
			);
		} else {
			timeLeft = controller.resume(Date.now());
		}

		this.setState({
			isRunning: true,
			endTime: Date.now() + timeLeft,
		});

		window.requestAnimationFrame(this.update);
	};

	private stopTimer = (): void => {
		if (this.state.isRunning) {
			this.setState({
				isRunning: false,
			});
			this.controller.pause();
		}
	};

	private update = (): void => {
		if (!this.state.isRunning) {
			return;
		}

		const values = this.controller.update(Date.now());
		if (values.isComplete) {
			this.endTimer();
		} else {
			this.setState({
				timeLeft: values.timeLeft,
				currentIndex: values.index,
			});
			window.requestAnimationFrame(this.update);
		}
	};

	private endTimer = (): void => {
		this.setState({
			currentIndex: 0,
			hasStarted: false,
			isRunning: false,
			endTime: 0,
			timeLeft: 0,
		});
		this.props.history.push('/');
	};
}

const mapStateToProps = (state: ISelectorReducerState) => {
	return {
		flattenedCircuit: flattenCircuit(state.currentCircuit, state.exerciseGroups, state.exercises),
	};
};

export const ConnectedCircuitTimer = connect(mapStateToProps)(CircuitTimer);
