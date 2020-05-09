import React from 'react'
import PropTypes from 'prop-types'
import './App.css'
import CircuitTimer from './components/CircuitTimer'

class App extends React.Component {
  constructor (props) {
    super(props)

    this.intervals = [
      { label: 'Warmup', time: 5, reps: 1, type: 'prep' },
      { label: 'Eat Bamboo', time: 10, reps: 1, type: 'exercise' },
      { label: 'Break 1', time: 5, reps: 1, type: 'break' },
      {
        label: '3 Sets of Sit Ups',
        time: 10,
        reps: 3,
        type: 'set',
        steps: [
          { label: 'Import Pandas', time: 8, reps: 1, type: 'exercise' },
          { label: 'Watch them tumble', time: 8, reps: 1, type: 'exercise' },
          { label: 'Porco eagle pose', time: 8, reps: 1, type: 'exercise' },
          { label: 'Porco pull ups yeah man', time: 8, reps: 1, type: 'exercise' },
          { label: 'Break - You\'ve done a great job', time: 3, reps: 1, type: 'break' }
        ]
      },
      { label: 'Cooldown', time: 5, reps: 1, type: 'prep' }
    ]
  }

  render () {
    return (
      <div className="App">
        <div>Circuit Trainer Timer</div>
        <CircuitTimer intervals={this.intervals} />
      </div>
    )
  }
}

App.propTypes = {
  intervals: PropTypes.arrayOf(PropTypes.object)
}

export default App
