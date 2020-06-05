import React, { useState, useEffect } from 'react';
import axios from 'axios'


const Search = ({ value, onChange }) => {
  return (
    <div>
      <span>Search for a country: </span>
      <input
        value={value}
        onChange={onChange}
      />
    </div>
  )
}

const AdditionalInfo = () => {
    return (
      <React.Fragment>
      hi
      </React.Fragment>
    )
}

const Countries = ({ countries, handleNewSearch }) => {
  if (countries.length === 1) {
    return (
      <div>
        <h1>{countries[0].name}</h1>
        <p><strong>Capital:</strong> {countries[0].capital}</p>
        <p><strong>Population:</strong> {countries[0].population}</p>
        <h2>Languages</h2>
        <ul>
          {countries[0].languages.map(el => <li>{el.name}</li>)}
        </ul>
        <img src={countries[0].flag} width='150px' alt="flag"/>

      </div>

    )

  } else if (countries.length < 11) {

  return (
    <div>
      {countries.map((c) => 
        <Country 
          name={c.name}
          handleNewSearch={handleNewSearch}
        />
      )}
    </div>
  )
} else {
  return (
    <div>
      <p>Too many matches, specificy another filter</p>
    </div>
  )

}

}

const Country = ({ name, handleNewSearch }) => {
  return (
    <div>
      {name}
      <button value={name} onClick={handleNewSearch}>show</button>
    </div>
  )
}

const App = () => {
  const [ countries, setCountries ] = useState([])
  const [ searchName, setSearchName ] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const handleNewSearch = (e) => {
    setSearchName(e.target.value)
  }


  const countriesFiltered = countries.filter(c => c.name.toLowerCase().includes(searchName.toLowerCase()))
  


  return (
    <div>
      <Search 
      value={searchName}
      onChange={handleNewSearch}
      />

      <Countries countries={countriesFiltered} handleNewSearch={handleNewSearch} />
    </div>
  );
}

export default App;
