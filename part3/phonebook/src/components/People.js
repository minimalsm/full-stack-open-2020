import React from 'react'
import Person from './Person'
import personService from '../services/persons'


const People = ({ people, setPersons, setErrorMessage }) => {

  const handleRemovePerson = (id) => {  
    if (window.confirm('Are you sure?')) {
      personService
      .removePerson(id)
      .then(data => {
        setPersons(people.filter(person => person.id !== id))
      })
      .catch(error => {
        setErrorMessage(
          `Person was already removed from server`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        setPersons(people.filter(person => person.id !== id))
      }
      )
    }
  }


  return (
    <>
      {people.map((person, i)=> 
        <div key={i}>
          <Person 
            person={person}
          />
          <button onClick={() => {handleRemovePerson(person.id);}}>
            delete
          </button>
        </div>
        )}
    </>
  )
}



export default People