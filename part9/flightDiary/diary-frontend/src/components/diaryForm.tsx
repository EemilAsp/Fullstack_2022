import React, { SyntheticEvent, useState } from "react"
import { NewDiaryEntry, Visibility, Weather } from "../types"

import {
  TextField,
  InputLabel,
  MenuItem,
  Select,
  Grid,
  Button,
  SelectChangeEvent,
} from "@mui/material"

interface Props {
  onSubmit: (values: NewDiaryEntry) => void
}

interface WeatherOption {
  value: Weather
  label: string
}

interface visibilityOption {
  value: Visibility
  label: string
}

const visibilityOptions: visibilityOption[] = Object.values(Visibility).map(
  (v) => ({
    value: v,
    label: v.toString(),
  })
)

const weatherOptions: WeatherOption[] = Object.values(Weather).map((w) => ({
  value: w,
  label: w.toString(),
}))

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

  const onWeatherChange = (event: SelectChangeEvent<string>) => {
    event.preventDefault()
    if (typeof event.target.value === "string") {
      const value = event.target.value
      const weather = Object.values(Weather).find((w) => w.toString() === value)
      if (weather) {
        setWeather(weather)
      }
    }
  }

  const onVisibilityChange = (event: SelectChangeEvent<string>) => {
    event.preventDefault()
    if (typeof event.target.value === "string") {
      const value = event.target.value
      const visibility = Object.values(Visibility).find(
        (v) => v.toString() === value
      )
      if (visibility) {
        setVisibility(visibility)
      }
    }
  }

  return (
    <div>
      <form onSubmit={addDiaryEntry}>
        <TextField
          label="Date"
          placeholder="YYYY-MM-DD"
          fullWidth
          value={date}
          onChange={({ target }) => setDate(target.value)}
        />
        <InputLabel style={{ marginTop: 20 }}>Weather</InputLabel>
        <Select
          label="Weather"
          fullWidth
          value={weather}
          onChange={onWeatherChange}
        >
          {weatherOptions.map((option) => (
            <MenuItem key={option.label} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
        <InputLabel style={{ marginTop: 20 }}>Visibility</InputLabel>
        <Select
          label="Visibility"
          fullWidth
          value={visibility}
          onChange={onVisibilityChange}
        >
          {visibilityOptions.map((option) => (
            <MenuItem key={option.label} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>

        <TextField
          label="Comment"
          fullWidth
          value={comment}
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
