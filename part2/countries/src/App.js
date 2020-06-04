import React, { useState, useEffect } from 'react';
import axios from 'axios'


const Search = ({ value, onChange }) => {
  return (
    <div>
      find countries
      <input
        value={value}
        onChange={onChange}
      />
    </div>
  )
}

const AdditionalInfo = () => {
    return (
      <div>
      hi
      </div>
    )
}

const Countries = ({ countries }) => {
  if (countries.length === 1) {
    return (
      <div>
        <h1>{countries[0].name}</h1>
        <p>capital {countries[0].capital}</p>
        <p>population {countries[0].population}</p>
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
      {countries.map(c => <Country name={c.name}/>)}
    </div>
  )
} else {
  return (
    <div>
      Too many matches, specificy another filter
    </div>
  )

}

}

const Country = ({ name }) => {
  return (
    <div>
      {name}
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

      debug: {searchName}
      Number of countries available === {countries.length}

      <Countries countries={countriesFiltered} />
    </div>
  );
}

export default App;
