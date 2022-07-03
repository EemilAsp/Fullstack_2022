
const Person = ({shownPersons}) => {
    return (
        <div>
            {shownPersons.map((person) => (
                <div key = {person.name}>
                    {person.name} {person.number}
                </div>
            ))}
        </div>
    )
  }
  
  export default Person;