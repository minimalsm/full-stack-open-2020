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

  const isDuplicate = () => persons.some(person => person.name === newName)
  

  const addPerson = (e) => {
    e.preventDefault()
    const person = {
      name: newName
    }

    if (isDuplicate()) {
      alert(`${newName} is already added to phonebook`)
    } else {
      setPersons(persons.concat(person))
    }

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
          {persons.map(person => <Person person={person} key={person.name} />)}
      </div>
    </div>
  )
}

export default App