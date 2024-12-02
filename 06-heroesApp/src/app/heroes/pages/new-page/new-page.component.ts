import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Hero, Publisher } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, switchMap, tap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';

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
              private router: Router,
              private snackbar: MatSnackBar,
              private dialog: MatDialog
  ) {  }

  ngOnInit(): void{
    if(!this.router.url.includes('edit')) 
      return;

    this.activatedRoute.params.pipe(
      switchMap(({id})=> this.heroesService.getHeroById(id)),
      ).subscribe(hero=>
      {
        if(!hero) 
          return this.router.navigateByUrl('/');
        this.heroForm.reset(hero);
        return;
      }
    )
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
        console.log("updated");
        this.showSnackbar(`${hero.superhero} updated!`);
      });
      return;
    }
    //else
    this.heroesService.addHero(this.currentHero)
    .subscribe( hero=>{
      this.router.navigate(['hero/edit', hero.id]);
      this.showSnackbar(`${hero.superhero} agregado!`);
    });
    return;
  }

  showSnackbar(message:string): void{
    this.snackbar.open(message, 'done', {duration:2500});
  }

  onDeleteHero(){
    if(!this.currentHero.id) throw Error('Hay un problema');

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: this.heroForm.value
    });

    dialogRef.afterClosed()
      .pipe(
        filter((result:boolean)=> result === true), // el ===true es unnecesary because is a boolean type - Filtra
        // tap(result => console.log(result)) //true false ou undefined
        switchMap( ()=> this.heroesService.deleteHeroById(this.currentHero.id)),
        filter((wasDeleted:boolean)=> wasDeleted)
      ).subscribe( () => this.router.navigate(['/heroes']))
    // dialogRef.afterClosed().subscribe(result => {
    //   // console.log('The dialog was closed');
    // //  console.log(result);
    //   if(!result) return;
    //   this.heroesService.deleteHeroById(this.currentHero.id)
    //   .subscribe( deleted =>{
    //     if(deleted)
    //       this.router.navigate(['/heroes']);
    //   })
    // });
  }
}
