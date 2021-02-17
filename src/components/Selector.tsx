import React, { ReactElement } from 'react';
import { connect } from 'react-redux';
import { History } from 'history';
import { ISelectorAction, ISelectorReducerState } from '../reducers';
import { Circuit } from '../types/circuits';
import { selectCircuit } from '../actions/selectorActions';
import { Dispatch } from 'redux';

type SelectorProps = {
	circuits: Array<Circuit>;
	history: History;
	selectCircuit: (circuit: Circuit) => void;
};

export class Selector extends React.Component<SelectorProps, Record<string, unknown>> {
	constructor(props: SelectorProps) {
		super(props);
	}

	public render(): ReactElement {
		const { circuits, history, selectCircuit } = this.props;

		return (
			<div>
				<div>Please Select a Circuit</div>
				{circuits.map((circuit) => {
					return (
						<div key={circuit.id}>
							<p>{circuit.name}</p>
							<button
								onClick={(e) => {
									e.preventDefault();
									selectCircuit(circuit);
									history.push('/');
								}}
							>
								select
							</button>
						</div>
					);
				})}
				<button onClick={() => history.push('/')}>Back</button>
			</div>
		);
	}
}

const mapStateToProps = (state: ISelectorReducerState) => {
	return {
		circuits: state.circuits,
	};
};

const mapDispatchToProps = (dispatch: Dispatch<ISelectorAction>) => ({
	selectCircuit: (circuit: Circuit) => dispatch(selectCircuit(circuit)),
});

export const ConnectedSelector = connect(mapStateToProps, mapDispatchToProps)(Selector);
