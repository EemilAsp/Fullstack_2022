import express, { Request } from "express"
import patientServices from "../services/patientsService"
import { NewPatientEntry } from "../types"
import toNewPatientEntry from "../utils/toNewPatientEntry"

const router = express.Router()

router.get("/", (_req, res) => {
  res.send(patientServices.getNonSensitiveEntries())
})

router.get("/:id", (req, res) => {
  const { id } = req.params
  const patient = patientServices.getPatientById(id)

  if (patient) {
    res.json(patient)
  } else {
    res.status(404).send("Patient not found")
  }
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
