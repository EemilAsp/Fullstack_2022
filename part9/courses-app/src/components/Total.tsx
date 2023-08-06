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
      <p>
        <b>Total number of excercises {totalExercises}</b>
      </p>
    </div>
  )
}

export default Total
