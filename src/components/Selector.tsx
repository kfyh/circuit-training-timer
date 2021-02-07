import React from 'react';
import { connect } from 'react-redux';

export function Selector({ history }) {
	return (
		<div>
			<div>Please Select a Circuit</div>
			<button onClick={() => history.push('/')}>Pick Me</button>
		</div>
	);
}

export const ConnectedSelector = connect()(Selector);
