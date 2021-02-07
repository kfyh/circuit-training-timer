import React from 'react';
import PropTypes from 'prop-types';

export function TimeLabel({ time }) {
	const divStyle = {
		color: 'blue',
		fontSize: '250pt',
	};

	let displayTime = Math.ceil(Math.max(0, time / 1000));
	if (displayTime > 60) {
		displayTime = Math.ceil(time / 1000 / 60) + ' mins';
		divStyle.fontSize = '130pt';
	}

	return <div style={divStyle}>{displayTime}</div>;
}

TimeLabel.propTypes = {
	time: PropTypes.number,
};
