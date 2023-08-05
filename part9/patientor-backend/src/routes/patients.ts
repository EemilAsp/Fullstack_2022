import express, { Request } from "express"
import patientServices from "../services/patientsService"
import { NewPatientEntry } from "../types"

const router = express.Router()

router.get("/", (_req, res) => {
  res.send(patientServices.getNonSensitiveEntries())
})

router.post("/", (req: Request<unknown, unknown, NewPatientEntry>, res) => {
  const { name, dateOfBirth, ssn, gender, occupation } = req.body

  const newPatient = patientServices.addPatient(
    name,
    dateOfBirth,
    ssn,
    gender,
    occupation
  )

  res.json(newPatient)
})

export default router
