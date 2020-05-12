import React from 'react'
import PropTypes from 'prop-types'
import './App.css'
import CircuitTimer from './components/CircuitTimer'
import Selector from './components/Selector'

class App extends React.Component {
  constructor (props) {
    super(props)

    this.intervals = [
      { label: 'Warmup', time: 5, reps: 1, type: 'prep' },
      {
        label: '3 Sets of Sit Ups',
        time: 10,
        reps: 3,
        type: 'set',
        steps: [
          { label: 'Import Pandas', time: 8, reps: 1, type: 'exercise' },
          { label: 'Break - You\'ve done a great job', time: 3, reps: 1, type: 'break' },
          { label: 'Watch them tumble', time: 8, reps: 1, type: 'exercise' },
          { label: 'Break - You\'ve done a great job', time: 3, reps: 1, type: 'break' },
          { label: 'Porco eagle pose', time: 8, reps: 1, type: 'exercise' },
          { label: 'Break - You\'ve done a great job', time: 3, reps: 1, type: 'break' },
          { label: 'Porco pull ups yeah man', time: 8, reps: 1, type: 'exercise' },
          { label: 'Break - You\'ve done a great job', time: 3, reps: 1, type: 'break' }
        ]
      },
      { label: 'Cooldown', time: 5, reps: 1, type: 'prep' }
    ]
    this.state = {
      selectionScreen: true
    }
  }

  RenderScreen = (selectionScreen) => {
    let screen
    if (selectionScreen) {
      screen = <Selector onClick={this.onSelectionMade} />
    } else {
      screen = <CircuitTimer intervals={this.intervals} onComplete={this.onComplete}/>
    }
    return screen
  }

  render () {
    return (
      <div className="App">
        <div>Circuit Trainer Timer</div>
        {this.RenderScreen(this.state.selectionScreen)}
      </div>
    )
  }

  onSelectionMade = () => {
    this.setState({
      selectionScreen: false
    });
  }

  onComplete = () => {
    this.setState({
      selectionScreen: true
    });
  }
}

App.propTypes = {
  intervals: PropTypes.arrayOf(PropTypes.object)
}

export default App
