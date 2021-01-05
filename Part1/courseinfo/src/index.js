import React from 'react'
import ReactDOM from 'react-dom'

const Part = (props) => {
    return (
        <>
            <p>{props.name} {props.numberOfExercise}</p>
        </>
    )
}

const Header = (props) => {
    return (
        <>
            <h1>
                {props.name}
            </h1>
        </>
    )
}

const Content = (props) => {

    return (
        <>
            <Part name={props.parts[0].name} numberOfExercise={props.parts[0].exercises} />
            <Part name={props.parts[1].name} numberOfExercise={props.parts[1].exercises} />
            <Part name={props.parts[2].name} numberOfExercise={props.parts[2].exercises} />

        </>
    )
}

const Total = (props) => {
    return (
        <div>
            <p>Number of exercises {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises}</p>
        </div>
    )
}

const App = () => {
    const course = {
        name: 'Half Stack application development',
        parts: [
            {
                name: 'Fundamentals of React',
                exercises: 10
            },
            {
                name: 'Using props to pass data',
                exercises: 7
            },
            {
                name: 'State of a component',
                exercises: 14
            }
        ]
    }
    
    return (
        <div>
            <Header name={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'))