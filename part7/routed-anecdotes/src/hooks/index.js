import { useState } from 'react'

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  console.log('THIS IS THE HOOK')

  return {
    type,
    value,
    onChange
  }
}