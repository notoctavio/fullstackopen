import { useState } from 'react'
import './App.css'

const Statistics = ({ countGood, countNeutral, countBad }) => {
  const total = countGood + countNeutral + countBad
  const average = total === 0 ? 0 : (countGood - countBad) / total
  const positivePercentage = total === 0 ? 0 : (countGood / total) * 100
  
  return (
    <div>
      <h2>statistics</h2>
      <p>good: {countGood}</p>
      <p>neutral: {countNeutral}</p>
      <p>bad: {countBad}</p>
      <p>total: {total}</p>
      <p>average: {average}</p>
      <p>positive: {positivePercentage.toFixed(1)}%</p>
    </div>
  )
}

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>

function App() {
  const [countGood, setCountGood] = useState(0)
  const [countNeutral, setCountNeutral] = useState(0)
  const [countBad, setCountBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <div className="counter">
        <Button onClick={() => setCountGood(countGood + 1)} text="good" />
        <Button onClick={() => setCountNeutral(countNeutral + 1)} text="neutral" />
        <Button onClick={() => setCountBad(countBad + 1)} text="bad" />
        <Statistics countGood={countGood} countNeutral={countNeutral} countBad={countBad} />  
      </div>
    </div>
  )
}

export default App
