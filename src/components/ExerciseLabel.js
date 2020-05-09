import React from 'react'
import PropTypes from 'prop-types'

function ExerciseLabel (props) {
  const interval = props.interval
  const excerciseLabel = interval.label
  const totalReps = interval.reps

  return (
    <div>{excerciseLabel} ({props.currentRep}/{totalReps})</div>
  )
}

ExerciseLabel.propTypes = {
  interval: PropTypes.object,
  currentRep: PropTypes.number
}

export default ExerciseLabel
