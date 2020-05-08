import React from 'react'
import PropTypes from 'prop-types'

class StarStopButton extends React.Component {
  render () {
    const label = this.props.isRunning ? 'Stop' : 'Start'
    return (
      <button onClick={this.props.onClick}>
        {label}
      </button>
    )
  }
}

StarStopButton.propTypes = {
  isRunning: PropTypes.bool,
  onClick: PropTypes.func
}

export default StarStopButton
