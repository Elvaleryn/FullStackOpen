import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Statistics = (props) => {
  return (


    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>






  )
}

const Button = (props) => {
  return (
    <>
      <button onClick={props.onClick}> {props.text}</button>
    </>
  )
}

const App = () => {
  // save clicks of each button to own state
  const [clicks, setClicks] = useState({ good: 0, neutral: 0, bad: 0 })

  const handleGood = () => {
    const newClicks = {
      ...clicks,
      good: clicks.good + 1
    }
    setClicks(newClicks);
  }

  const handleNeutral = () => {
    const newClicks = {
      ...clicks,
      neutral: clicks.neutral + 1
    }
    setClicks(newClicks);
  }

  const handleBad = () => {
    const newClicks = {
      ...clicks,
      bad: clicks.bad + 1
    }
    setClicks(newClicks);
  }

  const total = (clicks.good + clicks.bad + clicks.neutral)
  const average = (clicks.good + clicks.neutral + clicks.bad) / 3
  const positive = ((clicks.good * 100) / total) + "%"

  if (clicks.good === 0 && clicks.bad === 0 && clicks.neutral === 0) {
    return (
      <div>
        <h1>give feedback</h1>
        <Button onClick={handleGood} text="Good" />
        <Button onClick={handleNeutral} text="Neutral" />
        <Button onClick={handleBad} text="Bad" />
        <h1>Statistics</h1>
        <p>No feedback</p>
      </div>
    )
  }


  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={handleGood} text="Good" />
      <Button onClick={handleNeutral} text="Neutral" />
      <Button onClick={handleBad} text="Bad" />
      <h1>Statistics</h1>
      <table>
        <tbody>
          <Statistics text={"Good"} value={clicks.good} />
          <Statistics text={"Neutral"} value={clicks.neutral} />
          <Statistics text={"Bad"} value={clicks.bad} />
          <Statistics text={"All"} value={total} />
          <Statistics text={"Average"} value={average} />
          <Statistics text={"Positive"} value={positive} />
        </tbody>
      </table>
    </div>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)


