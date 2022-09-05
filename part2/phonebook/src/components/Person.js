
const Person = ({shownPersons, deleteContact}) => {
    return (
        <div>
            {shownPersons.map((person) => (
                <div key = {person.name}>
                    {person.name} {person.number}
                    <button onClick={() =>
                    deleteContact(person)}>delete</button>
                </div>
            ))}
        </div>
    )
  }
  
  export default Person;