require('dotenv').config()
const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

console.log('Connecting to', url)
mongoose.connect(url)
    .then(result => {
        console.log("Connected to MongoDB")
    }).catch(
    (error) =>{
        console.log("Error connecting to MongoDB:", error.message)
    })

const contactSchema = new mongoose.Schema({
    name: String,
    number: String
})


contactSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})


module.exports = mongoose.model("Contact", contactSchema)


