import './App.css'

let animals = [
  {
    name: 'Dog',
    size: 'medium'
  },
  {
    name: 'Cat',
    size: 'small'
  },
  {
    name: 'Elephant',
    size: 'large'
  }, 
  {
    name: 'Dog',
    size: 'small'
  }
]

let names = animals.map(x => x.name)

function App() {
  return (
    console.log(names)
  )
}

export default App

