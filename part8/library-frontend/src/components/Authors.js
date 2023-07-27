import { gql, useQuery } from "@apollo/client"

const Authors = (props) => {
  const GetAuthors = gql`
    query {
      allAuthors {
        name
        bookCount
        born
        id
      }
    }
  `
  const result = useQuery(GetAuthors)
  const authors = result.data.allAuthors

  if (result.loading) {
    return <div>loading...</div>
  }

  if (!props.show) {
    return null
  }

  return (
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
  )
}

export default Authors
