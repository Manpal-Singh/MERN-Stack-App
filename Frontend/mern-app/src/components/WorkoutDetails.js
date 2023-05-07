import React from 'react'
import axios from 'axios'
import { useWorkoutsContext } from '../hooks/useWorkoutsContext'
import { ReactComponent as DeleteIcon } from '../assets/svgs/deleteIcon.svg'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const WorkoutDetails = (props) => {
  const { workout } = props 
  const { dispatch } = useWorkoutsContext()

  const deleteWorkout = async () => {
    const response = await axios.delete('/api/workouts/' + workout._id, {
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        source: workout
      }
    })

    if (response.statusText === 'OK') {
      dispatch({
        type: 'DELETE_WORKOUT',
        payload: response.data
      })
    }
  }

  return (
    <div className='workout-details'>
      <h4>{workout.title}</h4>
      <p><strong>Load (KG) : </strong>{workout.load}</p>
      <p><strong>Reps : </strong>{workout.reps}</p>
      <p><strong>Created At : </strong>
        {formatDistanceToNow(new Date(workout.createdAt), {addSuffix: true})}</p>
      <span>
        <button onClick={deleteWorkout} className='delete-button'>
          <DeleteIcon />
        </button>
      </span>
    </div>
  )
}

export default WorkoutDetails