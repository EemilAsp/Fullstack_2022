import express, { Request, Response } from "express"
import calculateBmi from "./bmiCalculator"
import isNotNumber from "./utils"
import calculateExercise from "./exerciseCalculator"

const app = express()
app.use(express.json())

app.get("/bmi", (req, res) => {
  const height = Number(req.query.height)
  const weight = Number(req.query.weight)
  if (isNotNumber(height) || isNotNumber(weight)) {
    res.status(400).json({ error: "malformatted parameters" })
  } else {
    const results = {
      weight,
      height,
      bmi: calculateBmi(height, weight),
    }
    res.json(results)
  }
})

type excerciseType = {
  daily_exercises: number[]
  target: number
}

app.post("/exercises", (req, res) => {
  const { daily_exercises, target } = req.body as excerciseType
  if (!daily_exercises || !target) {
    return res.status(400).json({ error: "parameters missing" })
  } else if (isNotNumber(target) || !Array.isArray(daily_exercises)) {
    return res.status(400).json({ error: "malformatted parameters" })
  } else {
    const results = calculateExercise(daily_exercises, target)
    return res.json(results)
  }
})

const PORT = 3003

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
