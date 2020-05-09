import React from 'react'
import PropTypes from 'prop-types'

function ExerciseLabel (props) {
  const interval = props.intervals[props.state.currentIntervalIndex]
  let excerciseLabel = interval.label

  if (interval.type === 'set') {
    excerciseLabel = interval.steps[props.state.currentStepIndex].label
  }

  return (
    <div>{excerciseLabel} ({props.state.currentIntervalRep}/{interval.reps})</div>
  )
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
