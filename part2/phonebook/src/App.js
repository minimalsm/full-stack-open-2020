import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import People from './components/People'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filterName, setFilterName ] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])


  const handleNewName = (e) => {
    setNewName(e.target.value)
  }

  const handleNewNumber = (e) => {
    setNewNumber(e.target.value)
  }

  const handleNewSearch = (e) => {
    setFilterName(e.target.value)
  }

  const isDuplicate = () => persons.some(person => person.name === newName)
  

  const addPerson = (e) => {
    e.preventDefault()
    const person = {
      name: newName,
      number: newNumber
    }
    
    if (isDuplicate()) {
      alert(`${newName} is already added to phonebook`)
    } else {
       
      personService
      .create(person)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson));
        setNewName('')
      })
    }
  }

  const peopleToShow = !filterName ? persons : persons.filter(p => p.name.toLowerCase().includes(filterName.toLowerCase()))

  return (
    <div>
      <h2>Search the phonebook</h2>
      <Filter 
        value={filterName} 
        onChange={handleNewSearch}
      />
      
      <h2>Phonebook</h2>
      <PersonForm 
        addPerson={addPerson} 
        nameValue={newName} 
        onNameChange={handleNewName} 
        numberValue={newNumber}
        onNumberChange={handleNewNumber}
      />

      <h2>Numbers</h2>
      <People people={peopleToShow}/>
    </div>
  )
}

export default App