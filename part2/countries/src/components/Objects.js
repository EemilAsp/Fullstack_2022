
const Objects = ({countries}) => {
    if(countries.length > 10){return "Too many matches, specify another filter"}
    if(countries.lenth === 1){return countries[0]}
    else{
    return (
        <div>
            {countries.map((country, i) => (
                <div key={i}> {country}
                </div>
            ))}
        </div>
    )
  }}
  
  export default Objects;