export interface Entry {}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other",
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

export type NonSensitivePatientEntry = Omit<Patient, "ssn" | "entries">

export type NewPatientEntry = Omit<Patient, "id">
