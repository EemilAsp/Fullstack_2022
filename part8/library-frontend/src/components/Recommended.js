const Recommended = ({ show, books, favoriteGenre }) => {
  if (!show) {
    return null
  }

  const booksToShow = books.filter((book) =>
    book.genres.includes(favoriteGenre)
  )

  return (
    <div>
      <h2>Recommended</h2>
      <div>
        books in your favorite genre <b>{favoriteGenre}</b>
      </div>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {booksToShow.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Recommended
