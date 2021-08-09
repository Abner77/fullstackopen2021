
interface IResultExercise {  
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number 
  }


class ExerciseResult implements IResultExercise {

  periodLength: number;
  trainingDays: number = 0;
  success: boolean = false;
  rating: number = 0;
  ratingDescription: string = '';
  target: number = 0;
  average: number = 0;


  constructor(a:Array<number>){
    this.periodLength = a.length;
    a.forEach(n => n > 0 ? this.trainingDays++ : null);
    this.average = a.reduce((a, b) => a + b) / this.periodLength;
    this.success = this.average > 1 && this.trainingDays > this.periodLength * 0.7;
    this.average < 1 ? this.rating = 1 : this.rating = 2;
    this.average > 2 ? this.rating = 3 : null; 
    switch (this.rating) {
      case 1:        
        this.ratingDescription = 'looser';
        break;

      case 2:
        this.ratingDescription = 'good';
        break;

      case 3:
        this.ratingDescription = 'outstanding'    
        break;

      default:
        break;
    }          
  }

  getResult ():IResultExercise {    
    return {periodLength: this.periodLength, trainingDays: this.trainingDays, average: this.average, success: this.success, 
      target: this.target, rating: this.rating, ratingDescription: this.ratingDescription};
  }

}


const parseArgExercise = (args: Array<string>): Array<number> => {
  let result:Array<number> = []
  try {
    if (args.length < 5)
      throw ('error: not enought arguments')

    for (let i=2; i < args.length; i++) {
      if (Number(args[i]) < 0)
        throw ('arguments can not be negative values')
       result.push(Number(args[i]))
    }
  } catch (error) {
    console.log(error);    
    throw (error)
  }  
  return result
}


// const a:ExerciseResult = new ExerciseResult([2, 0, 3, 0, 1, 0, 0, 0, 3]);
const argumentos = parseArgExercise(process.argv);
// console.log(args);
// const a:ExerciseResult = new ExerciseResult([2, 0, 3, 0, 1, 0, 0, 0, 3]);
const a:ExerciseResult = new ExerciseResult(argumentos);
console.log(a.getResult());


