import { TestBed, ComponentFixture } from "@angular/core/testing"
import { HeroComponent } from "./hero.component"
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { By } from "@angular/platform-browser";

describe('Hero Component (Shallow tests)',()=>{

    let fixture : ComponentFixture<HeroComponent>;

    beforeEach(()=>{
        TestBed.configureTestingModule({
            declarations:[HeroComponent],
            schemas:[NO_ERRORS_SCHEMA] 
        });

        fixture =TestBed.createComponent(HeroComponent);
        
    });

    it('should have the correct hero', () => {
        //Input
        fixture.componentInstance.hero = {id:1, name:'SuperDude', strength:3};
        //Assert
        expect(fixture.componentInstance.hero.name).toEqual('SuperDude');
    });

    it('should render the hero name in an anchor tag',()=>{
       //Input
       fixture.componentInstance.hero = {id:1, name:'SuperDude', strength:3}; 
       
       //Tell the angular to Implement bindings i.e. {hero.id} and {hero.name}  
        fixture.detectChanges();

       expect(fixture.debugElement.query(By.css('a')).nativeElement.textContent).toContain('SuperDude');

       //expect(fixture.nativeElement.querySelector('a').textContent).toContain('SuperDude');
    });
})