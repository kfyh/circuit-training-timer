import React from 'react'
import PropTypes from 'prop-types'

class Timer extends React.Component {
  render () {
    const displayTime = Math.ceil(Math.max(0, this.props.time / 1000))
    return (
      <div>
                  Timer : {displayTime}
      </div>
    )
  }
}

Timer.propTypes = {
  time: PropTypes.number
}

export default Timer
