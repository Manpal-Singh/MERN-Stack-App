import React, { useState } from 'react'
import axios from 'axios'
import { useWorkoutsContext } from '../hooks/useWorkoutsContext'
import { useAuthContext } from '../hooks/useAuthContext'

const WorkoutForm = () => {
  const { dispatch } = useWorkoutsContext()
  const [title, setTitle] = useState('')
  const [load, setLoad] = useState('')
  const [reps, setReps] = useState('')
  const [error, setError] = useState('')
  const [emptyFields, setEmptyFields] = useState([])

  const {user} = useAuthContext()

  const addNewWorkout = async (e) => {
    e.preventDefault()
    if(!user) {
      setError('You must be Logged in')
      return
    }
    const workout = { title, load, reps }
    try {
      const response = await axios.post(
        '/api/workouts',
        JSON.stringify(workout),
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.token}`
          },
        }
      )
      // const response = await fetch(
      //     '/api/workouts', {
      //   method: 'POST',
      //   body: JSON.stringify(workout),
      //   headers: {
      //         'Content-Type': 'application/json',
      //       }
      // }
      //   )
      // let json = await response.json()
      // console.log('err', json)
	  
      if (response.statusText === 'OK') {
        setTitle('')
        setLoad('')
        setReps('')
        setError('')
	    	setEmptyFields([])
        dispatch({
          type: 'CREATE_WORKOUT',
          payload: response.data
        })
      }
    } catch (error) {
	    if (error.response.statusText !== 'OK') {
		    setEmptyFields(error.response.data.emptyFields)
	    }
      setError(error.response.data.error)
    }
  }

  return (
    <form onSubmit={addNewWorkout}>
      <h3>Add new Workout</h3>

      <label>Exercise Title :</label>
      <input
        type='text'
        onChange={(e) => setTitle(e.target.value)}
        value={title}
		    className={emptyFields.includes('title') ? 'errorClass' : ''}
      />

      <label>Load (in KG) :</label>
      <input
        type='number'
        onChange={(e) => setLoad(e.target.value)}
        value={load}
		    className={emptyFields.includes('load') ? 'errorClass' : ''}
      />

      <label>Reps :</label>
      <input
        type='number'
        onChange={(e) => setReps(e.target.value)}
        value={reps}
		    className={emptyFields.includes('reps') ? 'errorClass' : ''}
      />

      <button>Add Workout</button>
      <div>{error && <div className='error'>Error: {error}</div>}</div>
    </form>
  )
}

export default WorkoutForm
