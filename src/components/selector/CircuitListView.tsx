import React, { ReactElement } from 'react';
import Grid from '@material-ui/core/Grid';
import { Circuit } from '../../types/circuits';
import { CircuitView } from './CircuitView';

type CircuitListViewProps = {
	circuits: Array<Circuit>;
	onSelect: (circuit: Circuit) => void;
	onEdit: (circuit: Circuit) => void;
};

export const CircuitListView = ({ circuits, onSelect, onEdit }: CircuitListViewProps): ReactElement => {
	return (
		<Grid container spacing={2}>
			{circuits.map((circuit) => {
				return (
					<Grid item key={circuit.id}>
						<CircuitView key={circuit.id} circuit={circuit} onSelect={onSelect} onEdit={onEdit} />
					</Grid>
				);
			})}
		</Grid>
	);
};
