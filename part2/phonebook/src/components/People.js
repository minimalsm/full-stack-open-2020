import React from 'react'
import Person from './Person'

const People = ({ people }) => {
  return (
    <div>
      {people.map(person => <Person person={person} key={person.name} />)}
    </div>
  )
}

export default People