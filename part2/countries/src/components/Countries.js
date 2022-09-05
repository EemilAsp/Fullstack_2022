
const Countries = ({countries}) => {
    if(countries.length > 10){return (<div>Too many matches, specify another filter</div>)}
    if(countries.length <= 10 && countries.length > 1){
      return (
        <div>
          {countries.map((country, i) => 
            <div key={i}>
              {country.name.common}
            </div>
            )}
        </div>

      )
    }
    if(countries.length === 1){
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
            </div>
            )}
      </div>
    )}
    }
  
  export default Countries;