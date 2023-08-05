import React from "react"

interface Part {
  name: string
  exerciseCount: number
}

interface Totals {
  parts: Part[]
}

const Total = (props: Totals): JSX.Element => {
  const totalExercises = props.parts.reduce(
    (total, part) => total + part.exerciseCount,
    0
  )
  return (
    <div>
      <p>Total number of excercises {totalExercises}</p>
    </div>
  )
}

export default Total
