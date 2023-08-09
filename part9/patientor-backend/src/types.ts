export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other",
}

export interface Discharge {
  date: string
  criteria: string
}

export interface Patient {
  id: string
  name: string
  dateOfBirth: string
  ssn: string
  gender: Gender
  occupation: string
  entries: Entry[]
}

export interface BaseHealthCareEntry {
  id: string
  date: string
  specialist: string
  diagnosisCodes: string[]
  description: string
}

export interface HospitalEntry extends BaseHealthCareEntry {
  type: "Hospital"
  discharge: {
    date: string
    criteria: string
  }
}

export interface OccupationalHealthcareEntry extends BaseHealthCareEntry {
  type: "OccupationalHealthcare"
}

export type NonSensitivePatientEntry = Omit<Patient, "ssn" | "entries">

export type NewPatientEntry = Omit<Patient, "id">

export type Entry = OccupationalHealthcareEntry | HospitalEntry
