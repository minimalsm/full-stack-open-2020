import React from 'react'

const ErrorMessage = ({ message }) => {

  const errorMessage = {
    color: 'red',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }


  if (message === null) {
    return null
  }

  return (

    <div style={errorMessage}>
      {message}
    </div>
  )

}

export default ErrorMessage