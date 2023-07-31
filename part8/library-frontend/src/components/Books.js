import { useState } from "react"
// 8.21 and 8.22 left undone, would require switching the useQuery call here and other
//refactoring, so too much work.

const Books = ({ show, books }) => {
  const [genre, setGenre] = useState("All")

  if (!show) {
    return null
  }

  const bookGenres = ["All"]

  books.forEach((book) => {
    // iterate over all genres and create a list with each genre wthout duplicates
    book.genres.forEach((genre) => {
      if (!bookGenres.includes(genre)) {
        bookGenres.push(genre)
      }
    })
  })

  const booksToShow = books.filter((book) =>
    genre === "All" ? book : book.genres.includes(genre)
  )

  return (
    <div>
      <h2>books</h2>
      <div>
        in genre <b>{genre}</b>
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
      <div>
        {bookGenres.map((genre) => (
          <button key={genre} onClick={() => setGenre(genre)}>
            {genre}
          </button>
        ))}
      </div>
    </div>
  )
}

export default Books
