import React from 'react'
import PropTypes from 'prop-types'

function TimeLabel ({ time }) {
  const displayTime = Math.ceil(Math.max(0, time / 1000))
  return (
    <div>
      Timer : {displayTime}
    </div>
  )
}

TimeLabel.propTypes = {
  time: PropTypes.number
}

export default TimeLabel
