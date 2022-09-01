import { useState, useEffect } from 'react'


import Persons from "./components/Person"
import Filter from "./components/Filter"
import Personform from "./components/PersonForm"

const App = () => {
 
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  

  const [shownPersons, setPersonsToShow] = useState([
      { name: 'Arto Hellas', number: '040-123456' },
      { name: 'Ada Lovelace', number: '39-44-5323523' },
      { name: 'Dan Abramov', number: '12-43-234345' },
      { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])

  useEffect(() =>
    console.log('effect')
  )

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

  const addContact = (event) => {
    event.preventDefault(); //prevents the website from loading when clicking submit

    const phoneBookObject = { //save new contact as object
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    }
    
    if((persons.filter(person => person.name === newName).length > 0) || newName.length === 0 ) // test if the persons name is already added to contacts or no name added
    {
      alert( newName + " is already added to phonebook")
    }else{//if not save the contact info to persons array and shownPersons array
    setPersons(persons.concat(phoneBookObject));
    setPersonsToShow(persons.concat(phoneBookObject));
    event.target.reset();
    setNewName("");
    setNewNumber("");
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
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
          <Persons shownPersons={shownPersons}></Persons>
      </div>
    </div>
  )
}

export default App