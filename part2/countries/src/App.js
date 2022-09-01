import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Objects from './components/Objects'
import axios from 'axios'

const App = () => {

  const [countries, setCountries] = useState([])
  const [shownCountries, setCountriesToShow] = useState([])
  const [newFilter, setNewFilter] = useState('');

  useEffect(() => {
    console.log('effect')
    axios.get('https://restcountries.com/v3.1/all').then(response => {
      console.log('Countries hooked')
      const countries = response.data
      const key = countries.map(country => {return country.name.common})
      setCountries(key)
    })
  }, []);

  
  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
    setCountriesToShow(countries.filter((country) =>  
    country.toLowerCase().includes(newFilter.toLowerCase())));
  }

  return(
    <div>
      <Filter value={newFilter} onChange={handleFilterChange}/>
      <Objects countries={shownCountries}/>
    </div>
  )

}
export default App