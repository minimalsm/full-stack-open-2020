import React from 'react'

const PersonForm = ({addPerson, nameValue, onNameChange, numberValue, onNumberChange}) => {
  return (
    <div>
      <form onSubmit={addPerson}>
        <div>
          name:  
          <input 
            value={nameValue}
            onChange={onNameChange}
          />
          number:  
          <input 
            value={numberValue}
            onChange={onNumberChange}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  )
}

export default PersonForm