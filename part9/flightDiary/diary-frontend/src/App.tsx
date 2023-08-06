import React, { useEffect, useState } from "react"
import axios from "axios"
import { DiaryEntry } from "./types"

const App = () => {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([])
  console.log("Hello world")
  useEffect(() => {
    const fetchDiaryData = async () => {
      try {
        const { data } = await axios.get<DiaryEntry[]>(
          "http://localhost:3001/api/diaries"
        )
        setDiaries(data)
      } catch (error) {
        console.error("Error fetching data:", error)
      }
    }
    fetchDiaryData()
  }, [diaries])

  return (
    <div>
      <h1>Diaries</h1>
      {diaries.map((diary) => (
        <div key={diary.id}>
          <div>
            <b>{diary.date}</b>
          </div>
          <p>{diary.weather}</p>
          <p>{diary.visibility}</p>
        </div>
      ))}
    </div>
  )
}

export default App
