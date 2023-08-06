import React, { useEffect, useState } from "react"
import { DiaryEntry, NewDiaryEntry } from "./types"
import DiaryForm from "./components/diaryForm"
import diaryService from "./services/diaryService"

const App = () => {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([])
  console.log("Hello world")
  useEffect(() => {
    const fetchDiaryData = async () => {
      try {
        const data = await diaryService.getAll()
        setDiaries(data)
      } catch (error) {
        console.error("Error fetching data:", error)
      }
    }
    fetchDiaryData()
  }, [diaries])

  const submitNewDiary = async (values: NewDiaryEntry) => {
    try {
      const diaryEntry = await diaryService.create(values)
      setDiaries(diaries.concat(diaryEntry))
    } catch (error) {
      console.error("Error fetching data:", error)
    }
  }

  return (
    <div>
      <h1>Add new entry</h1>
      <DiaryForm onSubmit={submitNewDiary} />
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
