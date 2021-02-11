import React, { ReactElement } from 'react';

type StartStopButtonProps = {
	isRunning: boolean;
	onClick: () => void;
}

export function StartStopButton({ isRunning, onClick }: StartStopButtonProps): ReactElement {
	const label = isRunning ? 'Stop' : 'Start';
	return <button onClick={onClick}>{label}</button>;
}
