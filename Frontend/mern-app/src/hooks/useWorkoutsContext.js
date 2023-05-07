import { useContext  } from 'react'
import { WorkoutsContext } from '../context/WorkoutsContext'

export const useWorkoutsContext = () => {
  const context = useContext(WorkoutsContext)

  if(!context) {
    throw Error('useWorkoutsContext must be inside WorkoutsContextProvider')
  }

  return context
}