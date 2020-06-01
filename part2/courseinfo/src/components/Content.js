import React from 'react'
import Part from './Part'

const Content = ({parts}) => {
  return (
    <div>
      {parts.map(part => 
        <Part part={part.name} exercise={part.exercises} />
       )} 
    </div>
  )
}

export default Content