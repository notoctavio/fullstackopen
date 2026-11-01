import './App.css'

let orders = [
  { amount: 250 },
  { amount: 150 },
  { amount: 50 },
]


let total = orders.reduce((sum, order) => sum + order.amount, 0)

function App() {
  return (
    console.log(total)
  )
}

export default App

