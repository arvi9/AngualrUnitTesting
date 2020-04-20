import { HeroesComponent} from "./heroes.component"
import { of } from "rxjs";
describe('HerosComponent', ()=>{
    let component: HeroesComponent;
    let HEROES;
    let mockHeroService;

    beforeEach(()=>{

        //Setup
        HEROES = [
            {id:1,name:'SpiderDude', strength:8},
            {id:2, name:'Wonderful Women', strength:24},
            {id:3, name:'SuperDude', strength:55}
        ];
        //Mock Object: Jasmin to Create mock object -> Method Names
        mockHeroService = jasmine.createSpyObj(['getHeroes', 'addHero', 'deleteHero'])

        component = new HeroesComponent(mockHeroService);

    })

    describe('delete', ()=> {
        
        it('should remove the indecated hero from the heroes list', () => {
            //Mock to make Subsribe() method of deleteHero return true
            mockHeroService.deleteHero.and.returnValue(of(true));
            

            component.heroes = HEROES;

            component.delete(HEROES[2]);

            expect(component.heroes.length).toBe(2);

        })

        it('should call deleteHero', ()=>{
             //Mock to make Subsribe() method of deleteHero return true
             mockHeroService.deleteHero.and.returnValue(of(true));
             component.heroes = HEROES;
 
             component.delete(HEROES[2]);

             expect(mockHeroService.deleteHero).toHaveBeenCalled();
        })

        
    })

})