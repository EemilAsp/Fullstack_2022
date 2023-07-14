import { useState } from "react"

const Button = ({ handleClick, text }) => {
  return <button onClick={handleClick}>{text}</button>
}

const Stat = ({ type, value, symbol }) => (
  <>
    {type}
    {value}
    {symbol}
  </>
)

const Statistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad
  const average = (good - bad) / total
  const positive = (good / total) * 100

  if (total === 0) {
    return (
      <div>
        <p>No feedback given</p>
      </div>
    )
  }
  return (
    <div>
      <table>
        <tbody>
          <tr>
            <td>
              <Stat type="good" />
            </td>
            <td>
              <Stat value={good} symbol="" />
            </td>
          </tr>
          <tr>
            <td>
              <Stat type="neutral" />
            </td>
            <td>
              <Stat value={neutral} symbol="" />
            </td>
          </tr>
          <tr>
            <td>
              <Stat type="bad" />
            </td>
            <td>
              <Stat value={bad} symbol="" />
            </td>
          </tr>
          <tr>
            <td>
              <Stat type="total" />
            </td>
            <td>
              <Stat value={total} symbol="" />
            </td>
          </tr>
          <tr>
            <td>
              <Stat type="average" />
            </td>
            <td>
              <Stat value={average} symbol="" />
            </td>
          </tr>
          <tr>
            <td>
              <Stat type="positive" />
            </td>
            <td>
              <Stat value={positive} symbol="%" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => {
    setGood(good + 1)
  }

  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
  }

  const handleBadClick = () => {
    setBad(bad + 1)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={() => handleGoodClick()} text="good" />
      <Button handleClick={() => handleNeutralClick()} text="neutral" />
      <Button handleClick={() => handleBadClick()} text="bad" />
      <h2>statistics</h2>
      <Statistics good={good} neutral={neutral} bad={bad}></Statistics>
    </div>
  )
}

export default App
