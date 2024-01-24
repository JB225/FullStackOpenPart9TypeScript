interface Training {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number
};

const calculateExercises = (daily: number[], target: number): Training => {
    const daysTrained = daily.length;
    const trainingTotal = daily.reduce((total, current) => total + current);
    const trainingDays = daily.reduce((trained, current) => current == 0 ? trained : trained + 1);
    const average = trainingTotal / daysTrained;
    const percentageOfTarget = (average / target) * 100;
    const success = average > target ? true : false;


    let rating = 3;
    let ratingDescription = 'not too bad but could be better';
    if (percentageOfTarget >= 100) {
        rating = 1;
        ratingDescription = 'Amazing! Keep Going!';
    } else if ( percentageOfTarget >= 50) {
        rating = 2;
        ratingDescription = 'Making Progress! Keep pushing!';
    }

    return {
        periodLength: daysTrained,
        trainingDays: trainingDays,
        success: success,
        rating: rating,
        ratingDescription: ratingDescription,
        target: target,
        average: average
    };
};


const target = parseInt(process.argv[2]);
const daily = process.argv.slice(3).map(hours => +hours);

console.log(calculateExercises(daily, target));