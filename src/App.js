import React from 'react'
import PropTypes from 'prop-types'
import './App.css'
import CircuitTimer from './components/CircuitTimer'
import Selector from './components/Selector'

class App extends React.Component {
  constructor (props) {
    super(props)

    this.intervals = [
      { label: 'Burpies', time: 5, reps: 3, type: 'exercise' },
      {
        label: 'Finger Training',
        time: 10,
        reps: 7,
        type: 'set',
        steps: [
          { label: 'Hang for 7 secs', time: 60, reps: 1, type: 'exercise' },
          { label: 'Break and Recover', time: 240, reps: 1, type: 'break' }
        ]
      },
      { label: 'Finished', time: 5, reps: 1, type: 'prep' }
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
    })
  }

  onComplete = () => {
    this.setState({
      selectionScreen: true
    })
  }
}

App.propTypes = {
  intervals: PropTypes.arrayOf(PropTypes.object)
}

export default App
