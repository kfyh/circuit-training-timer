import React from 'react';
import './App.css';
import Timer from './components/Timer';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      intervals: [
        {label: "Warmup", time: 5, reps: 1, type: "prep"},
        {label: "Porco push ups", time: 10, reps: 1, type: "exercise"},
        {label: "Break 1", time: 5, reps: 1, type: "break"},
        {label: "3 Sets of Sit Ups", time:10, reps: 3, type: "set", steps: [
          {label: "Porco sit ups yeah man", time: 8, reps: 1, type: "exercise"},
          {label: "Break 2", time: 3, reps: 1, type: "break"},
        ]},
        {label: "Cooldown", time: 5, reps: 1, type: "prep"},
      ],
      currentIntervalIndex: 0,
      currentIntervalRep: 1,
      currentStepIndex: 0,
      currentStepRep: 1,
      isRunning: false,
      endTime: 0,
      timeLeft:  0,
    };

  }

  componentDidMount() {
  }

  componentWillUnmount() {
    this.stopTimer();
  }

  handleClick = () => {
    if (this.state.isRunning) {
      this.stopTimer();
    } else {
      this.startTimer();
    }
  }

  startTimer = () => {
    if (this.state.isRunning) {
      return;
    }

    let timeLeft = this.state.timeLeft;
    if (timeLeft <= 0) {
      const interval = this.state.intervals[this.state.currentIntervalIndex];
      timeLeft = interval.time * 1000;
    }

    this.setState( {
      isRunning: true,
      endTime: Date.now() + timeLeft

    });

    this.timer = setInterval(this.update, 100);
  }

  stopTimer = () => {
    if (this.state.isRunning) {
      this.setState( {
        isRunning: false
      });
      clearInterval(this.timer);
    }
  }

  update = () => {
    let endTime = this.state.endTime;
    if ((endTime - Date.now()) <= -20) {
      const result = this.setNextInterval(this.state);
      if (result.currentIntervalIndex < 0)
      {
        clearInterval(this.timer);
        this.setState({
          timeLeft: 0
        });
      } else {
        this.setState(result);
      }
    } else {
      this.setState({
        timeLeft: endTime - Date.now()
       });
    }
  }

  setNextInterval = (state) => {
    let currentIntervalIndex = state.currentIntervalIndex;
    let currentIntervalRep = state.currentIntervalRep;
    let currentStepIndex = state.currentStepIndex;
    let currentStepRep = state.currentStepRep;
    const currentInterval = state.intervals[currentIntervalIndex];

    if (currentInterval.type === "set") {
      const result = this.setSetInterval(state);
      currentIntervalIndex = result.currentIntervalIndex;
      currentIntervalRep = result.currentIntervalRep;
      currentStepIndex = result.currentStepIndex;
      currentStepRep = result.currentStepRep;
    } else if (currentIntervalRep < currentInterval.reps) {
      currentIntervalRep++;
    } else {
      const nextIntervalIndex = currentIntervalIndex + 1;
      if (nextIntervalIndex < state.intervals.length) {
        currentIntervalIndex = nextIntervalIndex;
        currentIntervalRep = 1;
      } else {
        currentIntervalIndex = -1
      }
    }

    if (currentIntervalIndex < 0) {
      return {
        currentIntervalIndex: -1,
        timeLeft: 0
      };
    } else {
      let newInterval = this.state.intervals[currentIntervalIndex]
      if (newInterval.type === "set") {
        newInterval = newInterval.steps[currentStepIndex]
      }
  
      return {
        timeLeft: newInterval.time * 1000,
        endTime: Date.now() + (newInterval.time * 1000),
        currentIntervalIndex: currentIntervalIndex,
        currentIntervalRep: currentIntervalRep,
        currentStepIndex: currentStepIndex,
        currentStepRep: currentStepRep
       };
    }
  }

  setSetInterval = (state) => {
    let currentIntervalIndex = state.currentIntervalIndex;
    let currentIntervalRep = state.currentIntervalRep;
    const currentInterval = state.intervals[currentIntervalIndex];

    let currentStepIndex = state.currentStepIndex;
    let currentStepRep = state.currentStepRep;
    const currentStep = currentInterval.steps[currentStepIndex]

    if (currentStepRep < currentStep.reps) {
      currentStepRep++;
    } else {
      currentStepRep = 1;
      const nextStepIndex = currentStepIndex + 1;
      if (nextStepIndex < currentInterval.steps.length) {
        currentStepIndex = nextStepIndex;
        currentStepRep = 1;
      } else {
        if (currentIntervalRep < currentInterval.reps) {
          currentIntervalRep++;
          currentStepIndex = 0;
          currentStepRep = 1;
        } else {
          const nextIntervalIndex = currentIntervalIndex + 1;
          if (nextIntervalIndex < state.intervals.length) {
            currentIntervalIndex = nextIntervalIndex;
            currentIntervalRep = 1;
          } else {
            currentIntervalIndex = -1
          }
        }       
      }
    }

    return {
        currentIntervalIndex: currentIntervalIndex,
        currentIntervalRep: currentIntervalRep,
        currentStepIndex: currentStepIndex,
        currentStepRep: currentStepRep
    };
  }

  render() {
    let buttonLabel = "Start";
    let handler = this.startTimer;
    if (this.state.isRunning) {
      buttonLabel = "Stop";
      handler = this.stopTimer;
    }

    const interval = this.state.intervals[this.state.currentIntervalIndex];
    let excerciseLabel = interval.label;
    if (interval.type === "set") {
      excerciseLabel = interval.steps[this.state.currentStepIndex].label;
    }

    return (
      <div className="App">
        <div>{excerciseLabel} ({this.state.currentIntervalRep}/{interval.reps})</div>
        <Timer time={Math.ceil(Math.max(0,this.state.timeLeft/1000))}/>
        <button onClick={handler}>
          {buttonLabel}
        </button>
      </div>
    );
  }
}

export default App;
