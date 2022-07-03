import { useState } from 'react'
import Persons from "./components/Person"
import Filter from "./components/Filter"

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
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')


  const handleNameChange = (event) => {
    setNewName(event.target.value)
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  };

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
    setPersonsToShow(persons.filter((person) =>
    person.name.toLowerCase().search(newFilter.toLowerCase()) !== -1));
  };


  const addInfo = (event) => {
    event.preventDefault()
    const phoneBookObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    }
    console.log(newName)
    if(persons.filter(person => person.name === newName).length >0)
    {
      alert( newName + " is already added to phonebook")
    }else{
    setPersons(persons.concat(phoneBookObject))
    setPersonsToShow(persons.concat(phoneBookObject))
    setNewName("")
    setNewNumber("")
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form> 
        <div>
          <Filter value={newFilter} onChange={handleFilterChange}></Filter>
        </div>
      <h3>add a new</h3>
      </form>
      <form onSubmit={addInfo}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <Persons shownPersons={shownPersons}/>
    </div>
  )

}

export default App