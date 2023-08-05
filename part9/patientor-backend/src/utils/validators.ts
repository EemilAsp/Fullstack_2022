import { Gender } from "../types"

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date))
}

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String
}

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error("Incorrect or missing date: " + date)
  }
  return date
}

const parseName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error("Incorrect or missing name")
  }
  return name
}

const isGender = (param: string): param is Gender => {
  return Object.values(Gender)
    .map((v) => v.toString())
    .includes(param)
}

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isString(gender) || !isGender(gender)) {
    throw new Error("Incorrect or missing gender: " + gender)
  }
  return gender
}

const parseOccupation = (occupation: unknown): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error("Incorrect or missing occupation")
  }
  return occupation
}

const parseSSN = (ssn: unknown): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error("Incorrect or missing ssn")
  }
  return ssn
}

export default {
  parseDate,
  parseName,
  parseGender,
  parseOccupation,
  parseSSN,
}
