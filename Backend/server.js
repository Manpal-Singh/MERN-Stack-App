const express = require('express')

// express app
const app = express()

// listening to requests
app.listen(4000, () => {
    console.log('App started and listening on port : 4000')
})