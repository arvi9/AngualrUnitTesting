describe('My first test',()=> {

    let sut;

    // Set to Empty because it should not affects other tests
    beforeEach(() => {
        sut = {}
    })

    it('Should be true if true', () =>{

        //Arrange
        sut.a = false;

        //Act
        sut.a = true;

        //assert
        expect(sut.a).toBe(true);

    })

})

// 'User service getUser method should retrieve the correct user'
// describe('user service', () =>
// {
//     describe('getUser method', ()=>{
//         it('Should retreive the correct user')
//     })
// })