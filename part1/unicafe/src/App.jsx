import { useState } from 'react'
import './App.css'

const DisplayGood = ({ counter }) => 
<div>
  <p>good: {counter}</p>
</div>

const DisplayNeutral = ({ counter }) => 
<div>
  <p>neutral: {counter}</p>
</div>

const DisplayBad = ({ counter }) => 
<div>
  <p>bad: {counter}</p>
</div>

const DisplayTotal = ({ countGood, countNeutral, countBad }) => {
  const total = countGood + countNeutral + countBad
  return (
    <div>
      <p>total: {total}</p>
    </div>
  )
}

const DisplayAverage = ({ countGood, countNeutral, countBad }) => {
  const total = countGood + countNeutral + countBad
  const average = total === 0 ? 0 : (countGood - countBad) / total
  return (
    <div>
      <p>average: {average}</p>
    </div>
  )
}

const DisplayPositive = ({ countGood, countNeutral, countBad }) => {
  const total = countGood + countNeutral + countBad
  const positivePercentage = total === 0 ? 0 : (countGood / total) * 100
  return (
    <div>
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
        <DisplayGood counter={countGood} />
        <DisplayNeutral counter={countNeutral} />
        <DisplayBad counter={countBad} />
        <DisplayTotal countGood={countGood} countNeutral={countNeutral} countBad={countBad} />
        <DisplayAverage countGood={countGood} countNeutral={countNeutral} countBad={countBad} />
        <DisplayPositive countGood={countGood} countNeutral={countNeutral} countBad={countBad} />
      </div>
    </div>
  )
}

export default App
