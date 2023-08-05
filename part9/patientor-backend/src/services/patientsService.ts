import patientData from "../data/patients.json"
import { Patient, NonSensitivePatientEntry } from "../types.ts"

const patients: Patient[] = patientData as Patient[]

const getEntries = (): Patient[] => {
  return patients
}

const getNonSensitiveEntries = (): NonSensitivePatientEntry[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }))
}

const addPatient = () => {
  return null
}

export default {
  getEntries,
  addPatient,
  getNonSensitiveEntries,
}
