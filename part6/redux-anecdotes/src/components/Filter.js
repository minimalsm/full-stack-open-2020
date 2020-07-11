import React from 'react'
import { useDispatch } from 'react-redux'
import { addFilter } from '../reducers/filterReducer'

const Filter = () => {
  const dispatch = useDispatch()

  const handleChange = (e) => {
    const filterValue = e.target.value
    dispatch(addFilter(filterValue))
  }

  return (
    <div>
      <p>Filter: <input name='filter' onChange={handleChange} /></p>
    </div>
  )
}

export default Filter