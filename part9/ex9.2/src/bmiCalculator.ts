

 type Diagnostic = 'underweight' | 'normal weight' | 'overweight' |  'moderately obese' | 'severely obese' | 'very severely obese'


const calculate = (weight: number, height:number) : Diagnostic => {

  let result: Diagnostic;

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

  throw Error('values out of range')
}


console.log(calculate(71, 179))
