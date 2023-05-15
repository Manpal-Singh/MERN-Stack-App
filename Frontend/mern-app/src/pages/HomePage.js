import React from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import WorkoutDetails from '../components/WorkoutDetails'
import WorkoutForm from '../components/WorkoutForm'
import { useWorkoutsContext } from '../hooks/useWorkoutsContext'
import { useAuthContext } from '../hooks/useAuthContext'

const HomePage = () => {
  const {workouts, dispatch} = useWorkoutsContext()
  // const [workouts, setWorkouts] = useState(null)
  const {user} = useAuthContext()

  useEffect(()=> {
    const getAllWorkouts = async () => {
      try {
        const response = await axios.get('/api/workouts', {
          headers: {
            'Authorization': `Bearer ${user.token}`
          }
        })
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
    if(user) {
      getAllWorkouts()
    }
  }, [dispatch, user])
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