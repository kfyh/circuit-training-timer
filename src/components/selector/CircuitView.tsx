import React, { ReactElement } from 'react';
import { Circuit } from '../../types/circuits';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Typography from '@material-ui/core/Typography';
import { Card } from '@material-ui/core';

type CircuitProps = {
	circuit: Circuit;
	onSelect: (circuit: Circuit) => void;
	onEdit: (circuit: Circuit) => void;
};

export class CircuitView extends React.Component<CircuitProps, Record<string, never>> {
	constructor(props: CircuitProps) {
		super(props);
	}

	public render(): ReactElement {
		return (
			<Card>
				<Typography>{this.props.circuit.name}</Typography>
				<ButtonGroup>
					<Button
						onClick={() => {
							this.props.onSelect(this.props.circuit);
						}}
						variant="contained"
						color="primary"
					>
						Select
					</Button>
					<Button
						onClick={() => {
							this.props.onEdit(this.props.circuit);
						}}
						variant="contained"
					>
						Edit
					</Button>
				</ButtonGroup>
			</Card>
		);
	}
}
