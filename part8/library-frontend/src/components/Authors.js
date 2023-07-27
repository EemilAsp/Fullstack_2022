import React, { useState } from "react"
import Select from "react-select"

const Authors = ({ show, authors, editAuthor }) => {
  const [selectedAuthor, setSelectedAuthor] = useState(null)
  const [born, setBorn] = useState("")

  if (!show) {
    return null
  }

  const selectOptions = authors.map((author) => ({
    value: author.name,
    label: author.name,
  }))

  const changeSelectedItem = (selectedItem) => {
    setSelectedAuthor(selectedItem)
  }

  const submit = async (event) => {
    event.preventDefault()
    try {
      console.log("Edit author...")
      editAuthor({
        variables: { name: selectedAuthor.value, setBornTo: +born },
      })
      setSelectedAuthor(null)
      setBorn("")
    } catch (exception) {
      console.log("error while editing author")
    }
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
            <Select
              value={selectedAuthor}
              onChange={changeSelectedItem}
              options={selectOptions}
              placeholder="Select author"
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
