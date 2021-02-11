import React, { ReactElement } from 'react';

type TimeLabelProps = {
	time: number;
};

export function TimeLabel({ time }: TimeLabelProps): ReactElement {
	const divStyle = {
		color: 'blue',
		fontSize: '250pt',
	};

	const timeSeconds = Math.ceil(Math.max(0, time / 1000));
	let displayTime = timeSeconds.toString();
	if (timeSeconds > 60) {
		displayTime = Math.ceil(time / 1000 / 60) + ' mins';
		divStyle.fontSize = '130pt';
	}

	return <div style={divStyle}>{displayTime}</div>;
}
