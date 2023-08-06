import Part from "./Part"
import { CoursePart } from "../types"

interface Content {
  courseParts: CoursePart[]
}

const Content = ({ courseParts }: Content): JSX.Element => {
  return (
    <div>
      {courseParts.map((coursePart) => (
        <Part key={coursePart.name} part={coursePart} />
      ))}
    </div>
  )
}

export default Content
