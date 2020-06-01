import React from 'react'
import Part from './Part'

const Content = ({parts}) => {
  const part = parts.map(part => 
    <Part part={part.name} exercise={part.exercises} />
   )

  return (
    <div>
      {part}
    </div>
  )
}

export default Content