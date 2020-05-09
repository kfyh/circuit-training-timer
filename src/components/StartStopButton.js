import React from 'react'
import PropTypes from 'prop-types'

function StarStopButton ({ isRunning, onClick }) {
  const label = isRunning ? 'Stop' : 'Start'
  return (
    <button onClick={onClick}>
      {label}
    </button>
  )
}

StarStopButton.propTypes = {
  isRunning: PropTypes.bool,
  onClick: PropTypes.func
}

export default StarStopButton
