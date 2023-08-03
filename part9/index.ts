import express from "express"
import calculateBmi from "./bmiCalculator"
import isNotNumber from "./utils"
const app = express()

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

const PORT = 3003

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
