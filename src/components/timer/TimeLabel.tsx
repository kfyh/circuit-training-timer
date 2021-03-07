import React, { ReactElement } from 'react';

type TimeLabelProps = {
	time: number;
	isResting: boolean;
};

export function TimeLabel({ time, isResting }: TimeLabelProps): ReactElement {
	const divStyle = {
		color: 'blue',
		fontSize: '250pt',
	};

	if (isResting) {
		divStyle.color = 'green';
	}

	const timeSeconds = Math.ceil(Math.max(0, time / 1000));
	let displayTime = timeSeconds.toString();
	if (timeSeconds > 60) {
		displayTime = Math.ceil(time / 1000 / 60) + ' mins';
		divStyle.fontSize = '130pt';
	}

	return <div style={divStyle}>{displayTime}</div>;
}
