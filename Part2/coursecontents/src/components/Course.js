import React from 'react';

const Header = ({course}) =>

    <h1>{course}</h1>

const Total = ({ parts }) => {
    console.log(parts);
    const total = parts.reduce((sum, part) => sum + part.exercises, 0)

    return <p>Total exercises: {total} </p>
}


const Part = ({ parts }) => {
    const partsName = parts.map((part) => (<p key={part.id}> {part.name} {part.exercises}  </p>))


    return (
        <>
            {partsName}
        </>
    )
}


const Content = ({ parts }) => {
    
    return (

        <div>
            <Part parts={parts} />
        </div>
    )
}

const Course = ({ course }) => {


    return (
        <>
            <Header course={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />

        </>
    )
}
export default Course;