import React, { ReactElement } from 'react';
import { connect } from 'react-redux';
import { History } from 'history';

type SelectorProps = {
	history: History;
};

export function Selector({ history }: SelectorProps): ReactElement {
	return (
		<div>
			<div>Please Select a Circuit</div>
			<button onClick={() => history.push('/')}>Pick Me</button>
		</div>
	);
}

export const ConnectedSelector = connect()(Selector);
