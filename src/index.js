import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'

const intervals = [
  { label: 'Warmup', time: 5, reps: 1, type: 'prep' },
  { label: 'Porco push ups', time: 10, reps: 1, type: 'exercise' },
  { label: 'Break 1', time: 5, reps: 1, type: 'break' },
  {
    label: '3 Sets of Sit Ups',
    time: 10,
    reps: 3,
    type: 'set',
    steps: [
      { label: 'Porco sit ups yeah man', time: 8, reps: 1, type: 'exercise' },
      { label: 'Break 2', time: 3, reps: 1, type: 'break' }
    ]
  },
  { label: 'Cooldown', time: 5, reps: 1, type: 'prep' }
]

ReactDOM.render(
  <React.StrictMode>
    <App intervals={intervals}/>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
