import React from 'react'
import { render } from '@testing-library/react'
import StartStopButton from './StartStopButton'

describe('Given StartStopButton', () => {
  const testValues = [
    [true, 'Stop'],
    [false, 'Start']
  ]

  test.each(testValues)('When isRunning is %b then button label is %s', (value, expected) => {
    const { getByText } = render(<StartStopButton isRunning={value} />)
    const timeElement = getByText(expected)
    expect(timeElement).toBeInTheDocument()
  })
})
