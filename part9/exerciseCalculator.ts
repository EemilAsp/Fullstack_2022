interface Result {
  periodLength: number
  trainingDays: number
  success: boolean
  rating: number
  ratingDescription: string
  target: number
  average: number
}

const calculateExercise = (hoursDaily: number[], target: number): Result => {
  const periodLength = hoursDaily.length
  const trainingDays = hoursDaily.filter((hour) => hour > 0).length
  const total = hoursDaily.reduce((sum, hour) => sum + hour, 0)
  const average = total / periodLength
  let success
  let rating
  let ratingDescription

  if (average > target + 2) {
    success = true
    rating = 3
    ratingDescription = "Perfect"
  } else if (average >= target + 1 || average >= target - 1) {
    success = true
    rating = 2
    ratingDescription = "not too bad but could be better"
  } else {
    success = false
    rating = 1
    ratingDescription = "Bad"
  }

  const result: Result = {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  }

  return result
}

const dailyHours = [3, 0, 2, 4.5, 0, 3, 1]
const targetHours = 2
console.log(calculateExercise(dailyHours, targetHours))
