import React, { useState } from 'react'



const Statistics = ({good,neutral, bad}) => {

  const all = good + neutral + bad
  if (all > 0)
  {
    return (
      <>
      <h2>statistics</h2>         
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p>all {all}</p>
      <p>average {(good - bad) / all} </p>
      <p>positive {(good / all) * 100 + "%"}</p>
      </>
    )
  }
  return (
    <>
      <h2>statistics</h2>   
      <p>No feedback was given yet</p>
    </>
  )
}

const Button = ({handleClick, text}) => {
  return (
    <button onClick={handleClick}>
      {text}
    </button>
  )
}

const App = () => {
  const [ good, setGood ] = useState(0)  
  const [bad, setBad] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const increaseGood = () => setGood(good + 1)
  const increaseNeutral = () => setNeutral(neutral + 1)
  const increaseBad = () => setBad(bad + 1)
  
  let all = good + neutral + bad
   
  return (
    <div>
      <h1>give feedback</h1>
      <Button
        handleClick={increaseGood}
        text='good'
      />
      <Button
        handleClick={increaseNeutral}
        text='neutral'
      />     
      <Button
        handleClick={increaseBad}
        text='bad'
      />  
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App