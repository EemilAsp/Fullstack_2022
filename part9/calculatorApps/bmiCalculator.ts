const calculateBmi = (height: number, weight: number): string => {
  const bmi = (weight / height / height) * 10000
  switch (true) {
    case bmi < 18.5:
      return "Underweight"
    case bmi >= 18.5 && bmi < 24.9:
      return "Normal (healthy weight)"
    case bmi >= 25 && bmi < 29.9:
      return "Overweight"
    default:
      return "Obese"
  }
}

/*  
const height = Number(process.argv[2])
const weight = Number(process.argv[3])

if (isNaN(height) || isNaN(weight)) {
  console.log("Height and weight should be numeric values")
} else {
  console.log(calculateBmi(height, weight))
}
*/

export default calculateBmi
