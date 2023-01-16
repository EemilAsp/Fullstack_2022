require('dotenv').config()
const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

console.log('Connecting to', url)
mongoose.connect(url)
  .then(() => {
    console.log('Connected to MongoDB')
  }).catch(
    (error) => {
      console.log('Error connecting to MongoDB:', error.message)
    })



const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    required: true
  },
  number: {
    type: String,
    minlength: [8, 'Phone number must be 8 characters long'],
    validate: {
      validator: function(val) {
        return(/^[0-9]{2,3}-[0-9]{6,10}$/.test(val))
      },
      message: props => `${props.value} is not a valid phone number! Must be in the format of 2-3 digits followed by 6-10 digits, separated by a dash (e.g 09-1234556 or 040-22334455)`
    },
    required: true
  }
})


contactSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})


module.exports = mongoose.model('Contact', contactSchema)


