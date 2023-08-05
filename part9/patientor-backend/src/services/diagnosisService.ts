import diagnoseData from "../data/diagnoses.json"

interface Diagnose {
  code: string
  name: string
  latin?: string
}

const diagnoses: Diagnose[] = diagnoseData as Diagnose[]

const getEntries = (): Diagnose[] => {
  console.log(diagnoses)
  return diagnoses
}

const addDiagnose = () => {
  return null
}

export default {
  getEntries,
  addDiagnose,
}
