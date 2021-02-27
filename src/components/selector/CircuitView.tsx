import React, { ReactElement } from 'react';
import { Circuit } from '../../types/circuits';

type CircuitProps = {
	circuit: Circuit;
	onClick: (circuit: Circuit) => void;
};

export class CircuitView extends React.Component<CircuitProps, Record<string, never>> {
	constructor(props: CircuitProps) {
		super(props);
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