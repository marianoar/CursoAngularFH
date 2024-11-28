import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Hero, Publisher } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-new-page',
  templateUrl: './new-page.component.html',
  styles: ``
})
export class NewPageComponent {

  public heroForm = new FormGroup({
    id: new FormControl<string>(''),
    superhero: new FormControl<string>('',{nonNullable: true}),
    publisher: new FormControl<Publisher>(Publisher.DCComics),
    alter_ego: new FormControl(''),
    firts_appearance: new FormControl(''),
    characters: new FormControl(''),
    alt_img: new FormControl('')
  });
  public publishers =[
    {id: 'DC Comics', desc: 'DC Comics'},
    {id: 'Marvel Comics', desc: "Marvel Comics"}
  ];

  constructor(private heroesService: HeroesService,
              private activatedRoute: ActivatedRoute,
              private router: Router
  ) {
    
    
  }

  get currentHero(): Hero{
    const hero = this.heroForm.value as Hero;
    return hero;
  }

  onSubmit():void{
    console.log( {
      formIsValid: this.heroForm.valid,
      value: this.heroForm.value
    })

    if(!this.heroForm.valid) return;

    if(this.currentHero.id){
      this.heroesService.updateHero(this.currentHero)
      .subscribe(hero=>{

      });
      return;
    }
    //else
    this.heroesService.addHero(this.currentHero)
    .subscribe( hero=>{

    });
  }
}
