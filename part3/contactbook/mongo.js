require('dotenv').config()
const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}
console.log(process.argv.length)

const password = process.argv[2] 
const contactNumber = process.argv[4]
const contactName = process.argv[3]

const url = process.env.MONGODB_URI

mongoose.connect(url)

const contactSchema = new mongoose.Schema({
    number: String,
    name: String
})

const Contact = mongoose.model('Contact', contactSchema)


const addContact = (contactName, contactNumber) => {
    const contact = new Contact({
        name: contactName,
        number: contactNumber
    })

    contact.save().then(result => {
        console.log("Contact saved!")
        mongoose.connection.close()
    })
}

const showContacts = () => {

    Contact.find({}).then(result => {
        console.log("Phonebook:")
        result.forEach(contact => {
            console.log(contact.name+" "+contact.number)
        })
        mongoose.connection.close()
    })
}

if(contactName != null && contactNumber != null ){
    addContact(contactName, contactNumber)
}else{
    showContacts()
}



