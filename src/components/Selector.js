import React from 'react'
import PropTypes from 'prop-types'

function Selector ({ onClick }) {
  return (
    <div>
      <div>
            Please Select a Circuit
      </div>
      <button onClick={onClick}>
        Pick Me
      </button>
    </div>
  )
}

Selector.propTypes = {
  onClick: PropTypes.func
}

export default Selector
