import React, { ReactElement } from 'react';
import { connect } from 'react-redux';
import { History } from 'history';
import { ISelectorReducerState } from 'src/reducers';
import { Circuit } from 'src/types/circuits';

type SelectorProps = {
	circuits: Array<Circuit>;
	history: History;
};

export function Selector({ circuits, history }: SelectorProps): ReactElement {
	return (
		<div>
			<div>Please Select a Circuit</div>
			{circuits.map((circuit) => {
				return <p>{circuit.name}</p>;
			})}
			<button onClick={() => history.push('/')}>Pick Me</button>
		</div>
	);
}

const mapStateToProps = (state: ISelectorReducerState) => {
	return {
		circuits: state.circuits,
	};
};

export const ConnectedSelector = connect(mapStateToProps)(Selector);
