import React, { useState } from 'react'

const Person = ({ person }) => {
 return (
   <div>
    {person.name}
   </div>
 )
}

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas' },
    { name: 'Alvar Aalto' }
  ]) 
  const [ newName, setNewName ] = useState('')

  const handleNewName = (e) => {
    setNewName(e.target.value)
  }

  const addPerson = (e) => {
    e.preventDefault()
    const person = {
      name: newName
    }
    setPersons(persons.concat(person))
    setNewName('')
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <form onSubmit={addPerson}>
        <div>
          name:  
          <input 
            value={newName}
            onChange={handleNewName}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>

      <h2>Numbers</h2>
      <div>
        <p>
          {persons.map(person => <Person person={person} key={person.name} />)}
        </p>
      </div>
    </div>
  )
}

export default App