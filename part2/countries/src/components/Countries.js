
import Weather from './Weather'

const Countries = ({countries, setCountriesToShow}) => {
    //more than 10 countries
    if(countries.length > 10){return (<div>Too many matches, specify another filter</div>)}
    //less than 10 but more than 1
    if(countries.length <= 10 && countries.length > 1){
      return (
        <div>
          {countries.map((country, i) => 
            <div key={i}>
              {country.name.common}
              <button onClick={() =>
                setCountriesToShow([country])}>
                  show</button>
            </div>//If button is pressed the country return country as countries
            )}
        </div>
      )
    }
    if(countries.length === 1){//if only 1 country -> show more info
    return(
      <div>
        {countries.map((country, i) => 
            <div key={i}>
              <h1>{country.name.common}</h1>
              <div>Capital: {country.capital}</div>
              <div>Area: {country.area}</div>
              <h2>Languages:</h2>
              <ul>
              {Object.values(country.languages).map(language => 
              <li key={language}>{language}</li>)}
              </ul>
              <img src={country.flags.png} alt={country.name.common} width="150" height="150"/>
              <Weather country={countries[0]}></Weather>
            </div>
            )}
            
      </div>
    )}
    }
  
  export default Countries;