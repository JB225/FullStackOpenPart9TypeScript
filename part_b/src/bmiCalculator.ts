export const calculateBmi = (height: number, weight: number) : string => {
    const bmi = (weight / Math.pow(height / 100, 2));

    if (bmi < 18.5) {
        return "Underweight";
    } else if (bmi < 24.9) {
        return "Normal (healthy weight)";
    } else if (bmi < 29.9) {
        return "Overweight";
    }
    return "Obese";
};

if (process.argv[2]) {
    console.log(calculateBmi(parseInt(process.argv[2]), parseInt(process.argv[3])));
}