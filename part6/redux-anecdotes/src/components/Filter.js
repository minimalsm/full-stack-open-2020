import React from 'react'
import { useDispatch } from 'react-redux'
import { addFilter } from '../reducers/filterReducer'

const Filter = () => {
  const dispatch = useDispatch()

  const handleChange = (event) => {
    const v = event.target.value
    console.log(v)
    dispatch(addFilter(v))
  }

  return (
    <div>
      <p>Filter: <input name='fitler' onChange={handleChange} /></p>
    </div>
  )
}

export default Filter