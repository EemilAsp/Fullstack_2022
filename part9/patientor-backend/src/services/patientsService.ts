import patientData from "../data/patients.json"
import { Patient, NonSensitivePatientEntry, NewPatientEntry } from "../types.ts"
import { v4 as uuid } from "uuid"

const patients: Patient[] = patientData as Patient[]

const getEntries = (): Patient[] => {
  return patients
}

// backend runs only in dev mode, npm run tsc build cannot acess the data folder ?
const getNonSensitiveEntries = (): NonSensitivePatientEntry[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }))
}

const addPatient = (patient: NewPatientEntry): Patient => {
  const newPatientEntry = {
    id: uuid(),
    ...patient,
  }

  patients.push(newPatientEntry)
  return newPatientEntry
}

export default {
  getEntries,
  addPatient,
  getNonSensitiveEntries,
}
