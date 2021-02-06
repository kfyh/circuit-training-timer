import React from 'react';
import './App.css';
import CircuitTimer from './components/CircuitTimer';
import Selector from './components/Selector';

interface PropsType {
	intervals: Array<object>
}

class App extends React.Component<PropTypes, {}> {
	private intervals: object[];

	constructor(props: object) {
		super(props);

		this.intervals = [
			{ label: 'Burpies', time: 5, reps: 3, type: 'exercise' },
			{
				label: 'Finger Training',
				time: 10,
				reps: 7,
				type: 'set',
				steps: [
					{ label: 'Hang for 7 secs', time: 7, reps: 1, type: 'exercise' },
					{ label: 'Break and Recover', time: 3, reps: 1, type: 'break' },
				],
			},
			{ label: 'Finished', time: 5, reps: 1, type: 'prep' },
		];
		this.state = {
			selectionScreen: true,
		};
	}

	public readonly RenderScreen = (selectionScreen): React.Component => {
		let screen;
		if (selectionScreen) {
			screen = <Selector onClick={this.onSelectionMade} />;
		} else {
			screen = <CircuitTimer intervals={this.intervals} onComplete={this.onComplete} />;
		}
		return screen;
	};

	public  render(): React.Element {
		return (
			<div className="App">
				<div>Circuit Trainer Timer</div>
				{this.RenderScreen(this.state.selectionScreen)}
			</div>
		);
	}

	private onSelectionMade = () => {
		this.setState({
			selectionScreen: false,
		});
	};

	private onComplete = () => {
		this.setState({
			selectionScreen: true,
		});
	};
}

export default App;
