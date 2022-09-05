import { useState, useEffect } from 'react'

import Persons from "./components/Person"
import Filter from "./components/Filter"
import Personform from "./components/PersonForm"
import contacts from "./services/contacts"
import Alerts from "./components/Alerts"

const App = () => {

  const [persons, setPersons] = useState([])
  const [shownPersons, setPersonsToShow] = useState([])
  const [alertmessage, setAlertmessage] = useState([])

  useEffect(() => { //Effect hook to get phonebook data from database
    console.log('effect')
    contacts.getAll().then(initialContacts => {
      setPersons(initialContacts)
      setPersonsToShow(initialContacts)
    })
  }, [])

  const [newFilter, setNewFilter] = useState('');
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  // If filter changes
  const handleFilterChange = (event) => {
    setNewFilter(event.target.value) //Input as filter
    setPersonsToShow(persons.filter((person) => //set filter to shownPersons array
    person.name.toLowerCase().search(newFilter.toLowerCase()) !== -1));//show all persons that match the letters given from input
  };

  const handleNameChange = (event) =>{
    setNewName(event.target.value) //new name from input
  }

  const handleNumberChange = (event) =>{
    setNewNumber(event.target.value) //new number from input
  }

  const deleteContact = (id) => {
    if(window.confirm(`Delete `+ id.name +` ?`)){
    contacts.deleteContact(id.id).then(returnedContact =>{
      setPersons(persons.filter(person => person.id !== id.id))
      setPersonsToShow(persons.filter(person => person.id !== id.id))
      setAlertmessage(id.name + " was succesfully deleted")
      setTimeout(() => {
        setAlertmessage(null)
      }, 4000)
    }).catch((error =>
      {
        setAlertmessage("ERROR! " +id.name + " is already deleted!")
        setPersons(persons.filter(person => person.id !== id.id))
        setPersonsToShow(persons.filter(person => person.id !== id.id))
        setTimeout(() => {
          setAlertmessage(null)
        }, 4000)
      }))}
    
  }

  const addContact = (event) => {
    event.preventDefault(); //prevents the website from loading when clicking submit
    const phoneBookObject = { //save new contact as object
      name: newName,
      number: newNumber
    }
    
    if((persons.filter(person => person.name === newName).length > 0) || newName.length === 0 ) // test if the persons name is already added to contacts or no name added
    {
      if(window.confirm(phoneBookObject.name+ " is already added to phonebook, replace old number with a new one?" )){
        const contact = persons.find(n => n.name === phoneBookObject.name)
        console.log(contact)
        const changedContact = { ...contact, number: phoneBookObject.number}
        contacts.update(contact.id, changedContact)
                .then(returnedContact => {
                  setPersons(persons.map(person => person.id !== contact.id ? person : changedContact))
                  setPersonsToShow(persons.map(person => person.id !== contact.id ? person : changedContact))
                  setAlertmessage(changedContact.name + " was succesfully updated")
                  setTimeout(() => {
                    setAlertmessage(null)
                  }, 4000)
                })}
    }else{//if not save the contact info to persons array and shownPersons array
    contacts
      .create(phoneBookObject)
      .then(returnedContact => {
        setPersons(persons.concat(returnedContact))
        setPersonsToShow(persons.concat(returnedContact))
        event.target.reset();
        setNewName("");
        setNewNumber("");
        setAlertmessage(phoneBookObject.name + " was succesfully added")
        setTimeout(() => {
          setAlertmessage(null)
        }, 4000)
      })
    
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <div><Alerts alertmessage={alertmessage}/></div>
      <div>
          <Filter value={newFilter} onChange={handleFilterChange}></Filter>
      </div>
      <h3>Add a new contact</h3>
      <div>
          <Personform addContact={addContact}
                      name={newName}
                      number={newNumber}
                      handleNameChange={handleNameChange}
                      handleNumberChange={handleNumberChange}>
          </Personform>
      </div>
      <h3>Contacts</h3>
      <div>
          <Persons shownPersons={shownPersons} deleteContact={deleteContact}></Persons>
      </div>
    </div>
  )
}

export default App