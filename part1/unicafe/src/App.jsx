import { useState } from 'react'
import './App.css'

const Statistics = ({ countGood, countNeutral, countBad }) => {
  const total = countGood + countNeutral + countBad
  const average = total === 0 ? 0 : (countGood - countBad) / total
  const positivePercentage = total === 0 ? 0 : (countGood / total) * 100

  if (total === 0) {
    return <p>No feedback given</p>
  }

  return (
    <div>
      <h2>statistics</h2>
      <table>
        <tbody>
          <StatisticLine text="good" value={countGood} />
          <StatisticLine text="neutral" value={countNeutral} />
          <StatisticLine text="bad" value={countBad} />
          <StatisticLine text="all" value={total} />
          <StatisticLine text="average" value={average} />
          <StatisticLine text="positive" value={`${positivePercentage.toFixed(1)}%`} />
        </tbody>
      </table>
    </div>
  )
}

const StatisticLine = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
)

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>

function App() {
  const [countGood, setCountGood] = useState(0)
  const [countNeutral, setCountNeutral] = useState(0)
  const [countBad, setCountBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <div className="counter">
        <Button text="good" onClick={() => setCountGood(countGood + 1)} />
        <Button text="neutral" onClick={() => setCountNeutral(countNeutral + 1)} />
        <Button text="bad" onClick={() => setCountBad(countBad + 1)} />
        <Statistics countGood={countGood} countNeutral={countNeutral} countBad={countBad} />
      </div>
    </div>
  )
}

export default App
