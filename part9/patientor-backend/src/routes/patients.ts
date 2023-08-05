import express from "express"
import patientServices from "../services/patientsService"

const router = express.Router()

router.get("/", (_req, res) => {
  res.send(patientServices.getNonSensitiveEntries())
})

router.post("/", (_req, res) => {
  res.send("Saving a patient!")
})

export default router
