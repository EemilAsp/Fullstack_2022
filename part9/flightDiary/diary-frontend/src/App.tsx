import React, { useEffect, useState } from "react"
import { DiaryEntry, NewDiaryEntry } from "./types"
import DiaryForm from "./components/diaryForm"
import diaryService from "./services/diaryService"
import { Alert } from "@mui/material"
import axios from "axios"

const dateRegex = /^\d{4}-\d{2}-\d{2}$/

const App = () => {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([])
  const [error, setError] = useState<string | null>(null)

  const clearError = () => {
    setTimeout(() => {
      setError(null)
    }, 3000)
  }

  useEffect(() => {
    const fetchDiaryData = async () => {
      try {
        const data = await diaryService.getAll()
        setDiaries(data)
      } catch (e: unknown) {
        setError("Error fetching data.")
        clearError()
      }
    }
    fetchDiaryData()
  }, [diaries])

  const submitNewDiary = async (values: NewDiaryEntry) => {
    if (!values.date.match(dateRegex)) {
      setError("Invalid date format. Please use YYYY-MM-DD.")
      clearError()
    } else {
      try {
        const diaryEntry = await diaryService.create(values)
        setDiaries(diaries.concat(diaryEntry))
      } catch (e: unknown) {
        if (axios.isAxiosError(e)) {
          if (e?.response?.data && typeof e?.response?.data === "string") {
            const errormessage = e.response.data.replace(
              "Something went wrong, Error",
              ""
            )
            console.error(errormessage)
            setError(errormessage)
            clearError()
          } else {
            setError("Unrecognized axios error")
            clearError()
          }
        } else {
          console.error("Unknown error", e)
          setError("Unknown error")
          clearError()
        }
      }
    }
  }

  return (
    <div>
      <h1>Add new entry</h1>
      {error && <Alert severity="error">{error}</Alert>}
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
