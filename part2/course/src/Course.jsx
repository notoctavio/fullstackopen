const Header = (props) => {
    return (
        <h1> Web development curriculum </h1>
    )
 }

const Content = (props) => {
    return (
        <div>
            <h2> {props.course.name} </h2>
            <ul>
                {props.course.parts.map(part => <li key={part.id}> {part.name} {part.exercises} </li>)}
            </ul>
        </div>
    )
 }

const Total = (props => {
    return (
        <div>
            <h4> Total of {props.course.parts.reduce((total, part) => total + part.exercises, 0)} exercises </h4>
        </div>
    )
 })

const Course = (props) => {
    return (
        <div>
            <Header />
            {props.courses.map(course => 
                <div key={course.id}>
                    <Content course={course} />
                    <Total course={course} />
                </div>
            )}
        </div>
    )
 }

export default Course