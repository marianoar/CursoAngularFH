import { Component } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { FormControl } from '@angular/forms';
import { Hero } from '../../interfaces/hero.interface';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styles: ``
})
export class SearchPageComponent {

  // hay que recordar importar el modulo... ReactiveFormModule 
  public searchInput = new FormControl('');

  public heroes: Hero[]=[];
  public selectedHero: Hero | undefined;

  constructor(private heroesService: HeroesService){
  }

  searchHero(){
    const value: string = this.searchInput.value || '';

    this.heroesService.getSuggestions(value)
        .subscribe( h => this.heroes=h);
  }

  onSelectedOption(event: MatAutocompleteSelectedEvent):void{
    console.log(event);
    if(!event.option.value){
      this.selectedHero = undefined
    }

    const hero: Hero = event.option.value;
    this.searchInput.setValue(hero.superhero);
    this.selectedHero= hero;

  }
}
