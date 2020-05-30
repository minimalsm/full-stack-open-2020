import React from 'react';
import ReactDOM from 'react-dom';

const Header = props => {
  return (
    <div>
      <h1>{props.title}</h1>
    </div>
  )
}

const Content = ({parts}) => {
  return (
    <div>
      <Part part={parts[0].name} exercise={parts[0].exercises} />
      <Part part={parts[1].name} exercise={parts[1].exercises} />
      <Part part={parts[2].name} exercise={parts[2].exercises} />
    </div>
  )
}

const Part = props => {
  return (
    <div>
      <p>{props.part} {props.exercise}</p>
    </div>
  )
}

const Total = ({ parts }) => {
  return (
    <div>
      <p>Number of exercises {parts[0].exercises + parts[1].exercises + parts[2].exercises}</p>
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
    <>
      <Header title={course.name}/>
      <Content parts={course.parts}/>
      <Total parts={course.parts}/>
    </>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))