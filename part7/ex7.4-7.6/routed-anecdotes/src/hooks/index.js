import { useState, } from 'react'

export const useField = () => {
  const [value, setValue] = useState('')

  const onChange = (event = null) => {
    setValue(event.target.value)
  }
  const reset = () => {
    setValue ('')
  }

  return {    
    value,
    onChange, 
    reset
  }
}

