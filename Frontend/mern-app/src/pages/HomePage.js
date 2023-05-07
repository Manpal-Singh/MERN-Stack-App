import React from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import WorkoutDetails from '../components/WorkoutDetails'
import WorkoutForm from '../components/WorkoutForm'
import { useWorkoutsContext } from '../hooks/useWorkoutsContext'

const HomePage = () => {
  const {workouts, dispatch} = useWorkoutsContext()
  // const [workouts, setWorkouts] = useState(null)

  useEffect(()=> {
    const getAllWorkouts = async () => {
      try {
        const response = await axios.get('/api/workouts')
        // setWorkouts(response.data)
        if (response.statusText === 'OK') {
          dispatch({
            type: 'SET_WORKOUTS',
            payload: response.data
          })
        }
      } catch (error) {
        console.error(error)
      }
    }

    getAllWorkouts()
  }, [dispatch])
  return (
    <div className='home'>
      <div className='workouts'>
        {workouts && workouts.map((workout) => (
          <WorkoutDetails key={workout._id} workout={workout} />
        ))}
      </div>
      <div>
        <WorkoutForm />
      </div>
    </div>
  )
}

export default HomePage