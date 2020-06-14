import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import People from './components/People'
import Notification from './components/Notification'
import ErrorMessage from './components/ErrorMessage'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filterName, setFilterName ] = useState('')
  const [ notification, setNotification ] = useState(null)
  const [ errorMessage, setErrorMessage ] = useState(null)


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

    //test
    
    if (isDuplicate()) {
      const replaceNumber = window.confirm(`${newName} is already added to phonebook, replace the old number with the new one?`)
      
      if (replaceNumber) {
      const duplicatePerson = persons.find(p => p.name === newName)
      const id = duplicatePerson.id

      personService
      .update(id, person)
      .then(returnedPerson => {
        setPersons(persons.map(person => person.id === id ? returnedPerson : person))
        setNewName('')
        setNewNumber('')
        setNotification(
          `The number for ${person.name} was changed`
        )
        setTimeout(() => {
          setNotification(null)
        }, 5000)
      })}
    } else {  
      personService
      .create(person)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
        setNotification(
          `Person ${person.name} was added to the phonebook`
        )
        setTimeout(() => {
          setNotification(null)
        }, 5000)
      })
      .catch(error => {
        const errorMessage = error.response.data.error
        setErrorMessage(errorMessage)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
    }
  }

  const peopleToShow = !filterName ? persons : persons.filter(p => p.name.toLowerCase().includes(filterName.toLowerCase()))

  return (
    <div>
      <h2>Search the phonebook</h2>
      <Notification message={notification}/>
      <ErrorMessage message={errorMessage} />
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
      <People 
        people={peopleToShow} 
        setPersons={setPersons}
        setErrorMessage={setErrorMessage}
      />
    </div>
  )
}

export default App