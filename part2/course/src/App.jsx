import './App.css'

const Course = (props) => {
  return (
    <div>
      <h1>{props.course.name}</h1>
    </div>
  )
}

const Content = (props) => {
  return (
    <div>
      {props.course.parts.map(part => <p> {part.name} {part.exercises} </p>)}
    </div>
  )
}

const Total = (props => {
  return (
    <div>
      <p> Number of exercises {props.course.parts.reduce((total, part) => total + part.exercises, 0)} </p>
    </div>
  )
})

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
      {
        name: 'Redux',
        exercises: 11,
        id: 4
      }
    ]
  }

  return (
    <div>
      <Course course={course} />
      <Content course={course} />
      <Total course={course} />
      
    </div>
  )
}

export default App