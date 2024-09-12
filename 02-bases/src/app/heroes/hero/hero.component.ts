import { Component } from '@angular/core';

@Component({
  selector: 'app-heroes-hero',
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css'
})
export class HeroComponent {

  
  public name : string = "Ironman";
  public age: number = 43;
  
  get capitalizeName():string{
    return this.name.toUpperCase();
  }

  getHeroDescripcion():string{
    return `${this.name} - ${this.age}`;
  }

  changeHero():void{
this.name = 'NewName';
  }

  changeAge():void{
this.age=22;
  }
}
