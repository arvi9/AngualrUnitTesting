import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HeroesComponent } from "./heroes.component";
import { NO_ERRORS_SCHEMA, Component, Input } from "@angular/core";
import { HeroService } from "../hero.service";
import { of } from "rxjs";
import { Hero } from "../hero";
import { By } from "@angular/platform-browser";
import { HeroComponent } from "../hero/hero.component";

describe('HeroesComponent (Deep Tests)', ()=>{

    let fixture: ComponentFixture<HeroesComponent>;
    let mockHeroService;
    let HEROES;
   
    beforeEach(()=>{
        
        //Mock Test Data
        HEROES=[
            {id:1,name:'SpiderDude', strength:8},
            {id:2,name:'Wonderful Woman', strength:24},
            {id:3,name:'SpiderDude', strength:55},
        ]
        
        //1. Moking the methods using Jasmine
        mockHeroService = jasmine.createSpyObj(['getHeroes', 'addHero','deleteHero']);
        

        TestBed.configureTestingModule({
           
            declarations: [HeroesComponent, HeroComponent],
            providers:[
               {provide:HeroService, useValue:mockHeroService}
            ],
            //NO_ERRORS_SCHEMA: This will hide any problems in our template. Eg: Misspelling buttons , a , etc
            schemas:[NO_ERRORS_SCHEMA]
        })
        fixture = TestBed.createComponent(HeroesComponent);
        
    });

   

    it('should render each hero as a HeroComponent', () => {
        mockHeroService.getHeroes.and.returnValue(of(HEROES));
        //Run ngOnInit
        fixture.detectChanges();
        
        //Accessing Child Element
        // By.directive --> Get all the debug elements attached to <app-hero> 
        const heroComponentDEs =  fixture.debugElement.queryAll(By.directive(HeroComponent));
        
        expect(heroComponentDEs.length).toEqual(3);
        // expect(heroComponentDEs[0].componentInstance.hero.name).toEqual('SpiderDude');
        // expect(heroComponentDEs[1].componentInstance.hero.name).toEqual('Wonderful Woman');
        // expect(heroComponentDEs[2].componentInstance.hero.name).toEqual('SpiderDude');
        
        for(let i=0; i< heroComponentDEs.length; i++)
        {
            //Comparing the Objects
            expect(heroComponentDEs[i].componentInstance.hero).toEqual(HEROES[i]);
        }
    });

    //DOM Interaction testing
    it('Should call heroService.deleteHero when the hero components delete button is clicked', () => {
        //Mock Delete method
        spyOn(fixture.componentInstance, 'delete');

        mockHeroService.getHeroes.and.returnValue(of(HEROES));
        //Run ngOnInit
        fixture.detectChanges();

        const heroComponents = fixture.debugElement.queryAll(By.directive(HeroComponent));
        //Raising events on Child Directives
        heroComponents[0].triggerEventHandler('delete', null);

        expect(fixture.componentInstance.delete).toHaveBeenCalledWith(HEROES[0]);
    });

     //DOM Interaction testing
     it('should add a new hero to the hero list when the add button is clicked', () =>
        {
            mockHeroService.getHeroes.and.returnValue(of(HEROES));
            //Run ngOnInit
            fixture.detectChanges();

            const name = "Mr. Ice";
            mockHeroService.addHero.and.returnValue(of({id: 5, name: name, strength: 4}));
            const inputElement = fixture.debugElement.query(By.css('input')).nativeElement;
            const addButton = fixture.debugElement.queryAll(By.css('button'))[0];
        
            inputElement.value = name;
            addButton.triggerEventHandler('click', null);
            fixture.detectChanges();
        
            const heroText = fixture.debugElement.query(By.css('ul')).nativeElement.textContent;
            expect(heroText).toContain(name);


        }
     );


});