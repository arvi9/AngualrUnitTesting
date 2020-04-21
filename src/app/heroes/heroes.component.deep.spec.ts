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

});