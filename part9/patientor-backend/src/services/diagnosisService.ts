import diagnoseData from "../../data/diagnoses.ts"

interface Diagnose {
  code: string
  name: string
  latin?: string
}

const getEntries = (): Diagnose[] => {
  return diagnoseData
}

const addDiagnose = () => {
  return null
}

export default {
  getEntries,
  addDiagnose,
}
