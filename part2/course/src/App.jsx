import './App.css'

const animals = [
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
  }
]

let isDog = function(animal) {
  return animal.name === 'Dog'
}

let dogs = animals.filter(isDog)

function App() {

  console.log('Hello world!')
  return (
    console.log(dogs)
  )
}

export default App

