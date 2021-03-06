import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ handleClick, text }) => {
  return (
    <button onClick={handleClick}>
      {text}
    </button>
  )
}

const StatisticsTable = ({ good, neutral, bad }) => {
  const total = (good + neutral + bad)

  if (total === 0) {
      return (
        <div>
          <h2>No statistics yet!</h2>
        </div>
      )
    }
  
  return (
    
    <table>
      <tbody>
        <Statistic text='good' rating={good} />
        <Statistic text='neutral' rating={neutral} />
        <Statistic text='bad' rating={bad} />
        <Statistic text='total' rating={total} />
        <Statistic text='average' rating={total / 3} />
        <Statistic text='positive' rating={good / total} />
      </tbody>
    </table>
  )

}

const Statistic = ({ text, rating }) => {
  return (
    <tr>
      <td>
        {text}: {rating}
      </td>
    </tr>
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


      <StatisticsTable good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)