// using express router as we can not use app.get() or app.post() outside server.js file
const express = require('express')
const router = express.Router()

const {
  createWorkout,
  getWorkouts,
  getWorkout,
  deleteWorkout,
  updateWorkout
} = require('../controllers/workoutControllers')
const requireAuth = require('../middlewares/requireAuth')

// Require Auth for all the below routes
router.use(requireAuth)

// GET: get all the workouts
router.get('/', getWorkouts)

// GET: get single workout
router.get('/:id', getWorkout)

// POST: create a new workout
router.post('/', createWorkout)

// DELETE: delete a workout
router.delete('/:id', deleteWorkout)

// PATCH: update a workout
router.patch('/:id', updateWorkout)

module.exports = router