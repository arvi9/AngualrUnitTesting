import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HeroesComponent } from "./heroes.component";
import { NO_ERRORS_SCHEMA, Component, Input } from "@angular/core";
import { HeroService } from "../hero.service";
import { of } from "rxjs";
import { Hero } from "../hero";
import { By } from "@angular/platform-browser";

describe('HeroesComponent (Shallow Tests)', ()=>{

    let fixture: ComponentFixture<HeroesComponent>;
    let mockHeroService;
    let HEROES;
    //Moking the Child Component
    @Component({
        selector: 'app-hero',
        template: '<div></div>',
      })

      //Moking the Child Component
      class FakeHeroComponent {
        @Input() hero: Hero;
        // @Output() delete = new EventEmitter();
      }  
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
            //Moking the Child Component: Add fake hero component to declerations 
            declarations: [HeroesComponent, FakeHeroComponent],
            providers:[
               {provide:HeroService, useValue:mockHeroService}
            ],
            //NO_ERRORS_SCHEMA: This will hide any problems in our template. Eg: Misspelling buttons , a , etc
           // schemas:[NO_ERRORS_SCHEMA]
        })
        fixture = TestBed.createComponent(HeroesComponent);
    });

   

    it('should set heros correctly from the service', () => {
        //2. Moking the Method return Data Value 'of the type observable'
        mockHeroService.getHeroes.and.returnValue(of(HEROES));
        
        fixture.detectChanges();

        expect(fixture.componentInstance.heroes.length).toBe(3);
    });

    it('should create one li for each hero', () =>{
        
        mockHeroService.getHeroes.and.returnValue(of(HEROES));
        
        fixture.detectChanges();

        expect(fixture.debugElement.queryAll(By.css('li')).length).toBe(3);

    });
});