import express, { Request } from "express"
import patientServices from "../services/patientsService"
import { NewPatientEntry } from "../types"
import toNewPatientEntry from "../utils/toNewPatientEntry"

const router = express.Router()

router.get("/", (_req, res) => {
  res.send(patientServices.getNonSensitiveEntries())
})

router.post("/", (req: Request<unknown, unknown, NewPatientEntry>, res) => {
  try {
    const newPatientEntry = toNewPatientEntry(req.body)
    const addedEntry = patientServices.addPatient(newPatientEntry)
    res.json(addedEntry)
  } catch (error: unknown) {
    let errorMessage = "Something went wrong."
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message
    }
    res.status(400).send(errorMessage)
  }
})

export default router
