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

console.log(calculateBmi(180, 74))
