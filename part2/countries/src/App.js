import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Countries from './components/Countries'
import axios from 'axios'

const App = () => {

  const [countries, setCountries] = useState([])
  const [shownCountries, setCountriesToShow] = useState([])
  const [newFilter, setNewFilter] = useState('');

  useEffect(() => {
    console.log('effect')
    axios.get('https://restcountries.com/v3.1/all').then(response => {
      console.log('All countries hooked')
      setCountries(response.data) //all data from api which requires mapping
    })
  }, []);

  
  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
    if(newFilter.length > 0){//filtering the objects where name.common does not equal to filter
      const filteredArray = countries.filter((country) =>
      country.name.common.toLowerCase().includes(newFilter.toLowerCase()));
      setCountriesToShow(filteredArray)
      console.log(filteredArray.map(language =>
        language.languages))
    };
  };

  return(
    <div>
      <Filter value={newFilter} onChange={handleFilterChange}/>
      <Countries countries={shownCountries}/>
    </div>
  )
}

export default App