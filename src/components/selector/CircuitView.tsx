import React, { ReactElement } from 'react';
import { Circuit } from '../../types/circuits';

type CircuitProps = {
	circuit: Circuit;
	onClick: (circuit: Circuit) => void;
};

export class CircuitView extends React.Component<CircuitProps, {}> {
	constructor(props: CircuitProps) {
		super(props);

		this.state = {
			currentIndex: 0,
			hasStarted: false,
			isRunning: false,
			endTime: 0,
			timeLeft: 0,
		};
	}

	public render(): ReactElement {
		return (
			<div>
				{this.props.circuit.name}
				<button
					onClick={(e) => {
						e.preventDefault();
						this.props.onClick(this.props.circuit);
					}}
				>
					Select
				</button>
			</div>
		);
	}
}