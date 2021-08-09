

export type Diagnostic = 'underweight' | 'normal weight' | 'overweight' |  'moderately obese' | 'severely obese' | 'very severely obese';


export const calculate = (weight: number, height:number) : Diagnostic => {
 
  const diagNumber = weight / (height * height);
  
  if (diagNumber >= 40)
    return 'very severely obese';
  if (diagNumber >= 35)
    return 'severely obese';
  if (diagNumber >= 30)
    return 'moderately obese';
  if (diagNumber >= 25)
    return 'overweight';
  if (diagNumber >= 20)
    return 'normal weight';
  if (diagNumber < 20)
    return 'underweight';

  throw Error('values out of range');
};


// const parsebmArguments = (args: Array<string>): Array<number> => {
//   let result:Array<number> = []
//   try {
//     console.log(args);
//     if (args.length !== 4)
//       throw ('error: you have to add 2 numbers as argument')

//     for (let i=2; i < args.length; i++) {
//       if (Number(args[i]) < 0)
//         throw ('arguments can not be negative values');
//       result.push(Number(args[i]))
//     }
//   } catch (error) {
//     console.log(error);        
//     throw(error);
//   }  
//   return result
// }


// const values = parsebmArguments(process.argv);
// console.log(values)
// console.log(calculate(values[0], values[1]))
