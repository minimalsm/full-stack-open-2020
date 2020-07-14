import React, { useState, useEffect } from 'react'
import axios from 'axios'

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

// const baseUrl = 'https://restcountries.eu/rest/v2/name'

const getCountry = (name) => {
  const url = `https://restcountries.eu/rest/v2/name/${name}?fullText=true`
  const request = axios.get(url)
  return request.then(response => {
    console.log('RESPONSE:', response.data)
    return response.data
  })
}

const useCountry = (name) => {
  const [country, setCountry] = useState([])

  try {
    useEffect(() => {
      getCountry(name)
        .then(returnedCountry => {
          setCountry({found: true, ...returnedCountry[0]})
        })
    }, [name])
  } catch {
    setCountry({found: false})
  }

  return country
}

const Country = ({ country }) => {
  if (!country) {
    return null
  }

  if (!country.found) {
    return (
      <div>
        not found...
      </div>
    )
  }

  return (
    <div>
      <h3>{country.name} </h3>
      <div>capital {country.capital} </div>
      <div>population {country.population}</div> 
      <img src={country.flag} height='100' alt={`flag of ${country.name}`}/>  
    </div>
  )
}

const App = () => {
  const nameInput = useField('text')
  const [name, setName] = useState('')
  const country = useCountry(name)

  const fetch = (e) => {
    e.preventDefault()
    setName(nameInput.value)
  }

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      <Country country={country} />
    </div>
  )
}

export default App