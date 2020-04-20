import { StrengthPipe } from "./strength.pipe"

describe('StrengthPipe', ()=> {
   it('Should display weak if the strength is 5', () => {
       //Arrange
       let pipe = new StrengthPipe();

       //Act
       let result = pipe.transform(5);

       //Assert
       expect(result).toEqual('5 (weak)');
   })
   
   it('should display strong if strength is 10', () => {
    //Arrange
    let pipe = new StrengthPipe();

    //Act
    let result = pipe.transform(10);

    //Assert
    expect(result).toEqual('10 (strong)');

   })
})