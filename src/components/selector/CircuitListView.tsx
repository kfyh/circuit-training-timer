import React, { ReactElement } from 'react';
import { Circuit } from '../../types/circuits';
import { CircuitView } from './CircuitView';

type CircuitListViewProps = {
	circuits: Array<Circuit>;
	onSelect: (circuit: Circuit) => void;
};

export const CircuitListView = ({ circuits, onSelect }: CircuitListViewProps): ReactElement => {
	return (
		<div>
			{circuits.map((circuit) => {
				return <CircuitView key={circuit.id} circuit={circuit} onClick={onSelect} />;
			})}
		</div>
	);
};
