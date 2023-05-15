require("dotenv").config()

const express = require("express")
const mongoose = require("mongoose") // ODM : object-data-model

const workoutsRoutes = require("./routes/workouts")
const usersRoutes = require("./routes/users")

// express app
const app = express()

// middleware
app.use(express.json()) // use this middleware to access req body data. ex- req.body
app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

//routes (syntax: app.get(route, callbackFunction) alternative)
app.use("/api/workouts", workoutsRoutes)
app.use("/api/users", usersRoutes)

// connect to DB (connect is a promise)
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    // listening to requests
    app.listen(process.env.PORT, () => {
      console.log(
        "App has connected with DB and listening on port :",
        process.env.PORT
      )
    })
  })
  .catch((error) => {
    console.log("Error while connecting to DB: ", error)
  })
