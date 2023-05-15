const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const validator = require('validator')

const Schema = mongoose.Schema

const userSchema = new Schema(
  {
    email: {
      type: String,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
)

// user signup method
userSchema.statics.signup = async function(email, password) {

  // Validations
  if(!email || !password) {
    throw Error("All fields must be filled")
  }

  if(!validator.isEmail(email)) {
    throw Error("Email is not valid")
  }

  if(!validator.isStrongPassword(password)) {
    throw Error("Password is not strong enough")
  }
  const emailExist = await this.findOne({ email })
  if(emailExist) {
    throw Error("Email already exists")
  }
 
  // adds extra layer of security to password by adding random string to password(abc123) i.e abc123mns
  const salt = await bcrypt.genSalt(10)
  // encrypt the password using bcrypt library by generating hash code
  const hash = await bcrypt.hash(password, salt)

  const user = await this.create({email, password: hash})
  
  return user
}

// user login method
userSchema.statics.login = async function(email, password) {
  if(!email || !password) {
    throw Error("All fields must be filled")
  }

  const user = await this.findOne({ email })
  if(!user) {
    throw Error("Email does not exists")
  }

  const match = await bcrypt.compare(password, user.password)
  if(!match) {
    throw Error("Password is not correct")
  }

  return user
}

module.exports = mongoose.model("User", userSchema)
