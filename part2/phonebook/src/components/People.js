import React from 'react'
import Person from './Person'

const People = ({ people }) => {
  return (
    <div>
      {people.map((person, i)=> <Person person={person} key={i} />)}
    </div>
  )
}

export default People