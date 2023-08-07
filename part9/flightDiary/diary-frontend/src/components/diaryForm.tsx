import React, { SyntheticEvent, useState } from "react"
import { NewDiaryEntry, Visibility, Weather } from "../types"

import { TextField, Grid, Button } from "@mui/material"

interface Props {
  onSubmit: (values: NewDiaryEntry) => void
}

const DiaryForm = ({ onSubmit }: Props) => {
  const [date, setDate] = useState("")
  const [weather, setWeather] = useState(Weather.Sunny)
  const [visibility, setVisibility] = useState(Visibility.Ok)
  const [comment, setComment] = useState("")

  const addDiaryEntry = (event: SyntheticEvent) => {
    event.preventDefault()
    onSubmit({
      date,
      weather,
      visibility,
      comment,
    })
  }

  //the dropdowns in visibility and weather basically ensure that only valid data is returned.
  //Error handling for the date is required.
  return (
    <div>
      <form onSubmit={addDiaryEntry}>
        <label>
          Date
          <input
            type="date"
            value={date}
            onChange={({ target }) => setDate(target.value)}
          />
        </label>

        <div>
          Weather:
          {Object.values(Weather).map((w) => (
            <label key={w}>
              <input
                type="radio"
                name="weather"
                value={w}
                checked={weather === w}
                onChange={() => setWeather(w)}
              />
              {w}
            </label>
          ))}
        </div>

        <div>
          Visibility:
          {Object.values(Visibility).map((v) => (
            <label key={v}>
              <input
                type="radio"
                name="visibility"
                value={v}
                checked={visibility === v}
                onChange={() => setVisibility(v)}
              />
              {v}
            </label>
          ))}
        </div>

        <TextField
          label="Comment"
          value={comment}
          variant="outlined"
          size="small"
          onChange={({ target }) => setComment(target.value)}
        />
        <Grid item>
          <Button
            style={{
              float: "right",
            }}
            type="submit"
            variant="contained"
          >
            Add
          </Button>
        </Grid>
      </form>
    </div>
  )
}

export default DiaryForm
