interface CoursePartBase {
  name: string
  exerciseCount: number
}

interface CoursePartWithDescription extends CoursePartBase {
  description: string
}

interface CoursePartBasic extends CoursePartWithDescription {
  kind: "basic"
}

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number
  kind: "group"
}

interface CoursePartSpecial extends CoursePartWithDescription {
  requirements: string[]
  kind: "special"
}

interface CoursePartBackground extends CoursePartWithDescription {
  backgroundMaterial: string
  kind: "background"
}

export type CoursePart =
  | CoursePartBasic
  | CoursePartGroup
  | CoursePartBackground
  | CoursePartSpecial
