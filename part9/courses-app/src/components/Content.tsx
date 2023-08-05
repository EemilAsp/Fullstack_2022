import React from "react"

interface Part {
  name: string
  exerciseCount: number
}

interface Contents {
  parts: Part[]
}

const Content = (props: Contents): JSX.Element => {
  return (
    <div>
      {props.parts.map((part, index) => (
        <p key={index}>
          {part.name} {part.exerciseCount}
        </p>
      ))}
    </div>
  )
}

export default Content
