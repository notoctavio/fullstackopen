import './App.css'

function Display (props) {
  console.log('Props value is', props)
  return (
    <p>Hello world!</p>
  )
}

function App() {

  console.log('Hello world!')
  return (
    <Display /> 

  )
}

export default App
