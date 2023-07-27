import { useState } from "react"

const Authors = ({ show, authors, editAuthor }) => {
  const [name, setName] = useState("")
  const [born, setBorn] = useState("")
  if (!show) {
    return null
  }

  const submit = async (event) => {
    event.preventDefault()
    console.log("Edit author...")

    editAuthor({ variables: { name, setBornTo: +born } })
    setName("")
    setBorn("")
  }

  return (
    <div>
      <div>
        <h2>authors</h2>
        <table>
          <tbody>
            <tr>
              <th></th>
              <th>born</th>
              <th>books</th>
            </tr>
            {authors.map((a) => (
              <tr key={a.name}>
                <td>{a.name}</td>
                <td>{a.born}</td>
                <td>{a.bookCount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        <h3>Set birth year</h3>
        <p></p>
        <form onSubmit={submit}>
          <div>
            name
            <input
              value={name}
              onChange={({ target }) => setName(target.value)}
            />
          </div>
          <div>
            born
            <input
              value={born}
              onChange={({ target }) => setBorn(target.value)}
            />
          </div>
          <button type="submit">update author</button>
        </form>
      </div>
    </div>
  )
}

export default Authors
