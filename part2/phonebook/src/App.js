import React, { useState } from 'react'

const Person = ({ person }) => {
 return (
   <div>
    {person.name} {person.number}
   </div>
 )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])

  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filterName, setFilterName ] = useState('')
  const [ showAll, setShowAll ] = useState()



  const handleNewName = (e) => {
    setNewName(e.target.value)
  }

  const handleNewNumber = (e) => {
    setNewNumber(e.target.value)
  }

  const handleNewSearch = (e) => {
    setFilterName(e.target.value)

    filterName ? setShowAll(false) : setShowAll(true)
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
      setPersons(persons.concat(person))
    }

    setNewName('')
  }

  const peopleToShow = showAll ? persons : persons.filter(p => p.name.includes(filterName))

  return (
    <div>
      <h2>Phonebook</h2>

      <div>
      search
        <input
          value={filterName}
          onChange={handleNewSearch}
        />
      </div>

      <p>debug new search: {filterName}</p>

      <form onSubmit={addPerson}>
        <div>
          name:  
          <input 
            value={newName}
            onChange={handleNewName}
          />
          number:  
          <input 
            value={newNumber}
            onChange={handleNewNumber}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>

      <h2>Numbers</h2>
      <div>
          
          {peopleToShow.map(person => <Person person={person} key={person.name} />)}
      </div>
    </div>
  )
}

export default App