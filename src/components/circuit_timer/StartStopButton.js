import React from 'react';
import PropTypes from 'prop-types';

export function StartStopButton({ isRunning, onClick }) {
	const label = isRunning ? 'Stop' : 'Start';
	return <button onClick={onClick}>{label}</button>;
}

StartStopButton.propTypes = {
	isRunning: PropTypes.bool,
	onClick: PropTypes.func,
};
