import React from 'react'
import { connect } from 'react-redux'
import { addFilter } from '../reducers/filterReducer'

const Filter = (props) => {
  const handleChange = (e) => {
    const filterValue = e.target.value
    props.addFilter(filterValue)
  }

  return (
    <div>
      <p>Filter: <input name='filter' onChange={handleChange} /></p>
    </div>
  )
}

const mapDispatchToProps = {
  addFilter
}

export default connect(null, mapDispatchToProps)(Filter)