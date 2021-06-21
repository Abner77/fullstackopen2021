import React, { useState } from 'react'





const Statistic = ({value, text})  => {
  return (
    <tr>
    <td>{text}</td>
    <td>{value}</td>
    </tr>
  )

}

const Statistics = ({good,neutral, bad}) => {

  const all = good + neutral + bad
  if (all > 0)
  {
    return (
      <div>
        <h2>statistics</h2>       
        <table>    
          <tbody>
            <Statistic text="good" value={good}/>    
            <Statistic text="neutral" value={neutral}/>      
            <Statistic text="bad" value={bad}/>            
            <Statistic text="all" value={all}/>                  
            <Statistic text="average" value={(good - bad) / all}/>            
            <Statistic text="positive" value={(good / all) * 100 + "%"}/>                              
          </tbody>
        </table>
      </div>
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