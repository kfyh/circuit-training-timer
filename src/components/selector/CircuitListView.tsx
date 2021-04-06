import React, { ReactElement } from 'react';
import Grid from '@material-ui/core/Grid';
import { Circuit } from '../../types/circuits';
import { CircuitView } from './CircuitView';

type CircuitListViewProps = {
	circuits: Array<Circuit>;
	onSelect: (circuit: Circuit) => void;
};

export const CircuitListView = ({ circuits, onSelect }: CircuitListViewProps): ReactElement => {
	return (
		<Grid container spacing={2}>
			{circuits.map((circuit) => {
				return (
					<Grid item>
						<CircuitView key={circuit.id} circuit={circuit} onClick={onSelect} />
					</Grid>
				);
			})}
		</Grid>
	);
};
