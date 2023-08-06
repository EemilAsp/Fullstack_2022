import React from "react"
import { CoursePart } from "../types"

interface Part {
  part: CoursePart
}

const partStyle: React.CSSProperties = {
  lineHeight: "0.5",
  marginBottom: "5px",
}

const Part = (props: Part): JSX.Element => {
  switch (props.part.kind) {
    case "basic":
      return (
        <div style={partStyle}>
          <h3>{props.part.name}</h3>
          <p>Exercises: {props.part.exerciseCount}</p>
          <p>Description: {props.part.description}</p>
        </div>
      )
    case "group":
      return (
        <div style={partStyle}>
          <h3>{props.part.name}</h3>
          <p>Exercises: {props.part.exerciseCount}</p>
          <p>Group Project Count: {props.part.groupProjectCount}</p>
        </div>
      )
    case "background":
      return (
        <div style={partStyle}>
          <h3>{props.part.name}</h3>
          <p>Exercises: {props.part.exerciseCount}</p>
          <p>Description: {props.part.description}</p>
          <p>Background Material: {props.part.backgroundMaterial}</p>
        </div>
      )
    case "special":
      return (
        <div style={partStyle}>
          <h3>{props.part.name}</h3>
          <p>Exercises: {props.part.exerciseCount}</p>
          <p>Description: {props.part.description}</p>
          <p>Requirements: {props.part.requirements.join(", ")}</p>
        </div>
      )
    default:
      return <div></div>
  }
}

export default Part
