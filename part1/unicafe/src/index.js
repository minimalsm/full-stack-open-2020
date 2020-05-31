import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ handleClick, text }) => {
  return (
    <button onClick={handleClick}>
      {text}
    </button>
  )
}

const Display = ({ text, rating }) => {
  return (
    <div>
      {text}: {rating}
    </div>
  )
}


const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
        <Button handleClick={() => setGood(good + 1)} text='good'/>
        <Button handleClick={() => setNeutral(neutral + 1)} text='neutral'/>
        <Button handleClick={() => setBad(bad + 1)} text='bad'/>


      <h2>statistics</h2>
      <Display text='good' rating={good} />
      <Display text='neutral' rating={neutral} />
      <Display text='bad' rating={bad} />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)