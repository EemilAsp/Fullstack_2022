import { NewPatientEntry } from "../types"
import validator from "./validators"

const toNewPatientEntry = (object: unknown): NewPatientEntry => {
  if (!object || typeof object != "object") {
    throw new Error("Incorrect or missing data")
  }

  if (
    "name" in object &&
    "dateOfBirth" in object &&
    "ssn" in object &&
    "gender" in object &&
    "occupation" in object
  ) {
    const newEntry: NewPatientEntry = {
      name: validator.parseName(object.name),
      dateOfBirth: validator.parseDate(object.dateOfBirth),
      ssn: validator.parseSSN(object.ssn),
      gender: validator.parseGender(object.gender),
      occupation: validator.parseOccupation(object.occupation),
      entries: [],
    }
    return newEntry
  }
  throw new Error("Incorrect data: a field missing")
}

export default toNewPatientEntry
