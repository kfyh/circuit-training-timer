import React from 'react'
import PropTypes from 'prop-types'

class ExerciseLabel extends React.Component {
  render () {
    const interval = this.props.intervals[this.props.state.currentIntervalIndex]
    let excerciseLabel = interval.label

    if (interval.type === 'set') {
      excerciseLabel = interval.steps[this.props.state.currentStepIndex].label
    }

    return (
      <div>{excerciseLabel} ({this.props.state.currentIntervalRep}/{interval.reps})</div>
    )
  }
}

ExerciseLabel.propTypes = {
  intervals: PropTypes.arrayOf(PropTypes.object),
  state: PropTypes.shape({
    currentIntervalIndex: PropTypes.number,
    currentIntervalRep: PropTypes.number,
    currentStepIndex: PropTypes.number,
    currentStepRep: PropTypes.number
  })
}

export default ExerciseLabel
