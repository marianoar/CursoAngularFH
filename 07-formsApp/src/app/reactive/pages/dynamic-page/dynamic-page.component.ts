import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  templateUrl: './dynamic-page.component.html',
  styles: ``
})
export class DynamicPageComponent implements OnInit{

  public myForm!: FormGroup;

  public newFavorite: FormControl = new FormControl('', [Validators.required]);

  constructor(private fb: FormBuilder){  }

  ngOnInit(): void {
    this.myForm = this.fb.group({
      name:['',[Validators.required, Validators.minLength(3)]],
      favoriteGames: this.fb.array([
        ['Prince of Persian', Validators.required],
        ['Pacman', Validators.required]
      ])
    })
  }

  get favoriteGames(){
    return this.myForm.get('favoriteGames') as FormArray;
  }

  isValidField(field: string): boolean | null{
    return this.myForm.controls[field].errors && this.myForm.controls[field].touched;
  }

  isValidFieldInArray(formArray: FormArray, i: number){
    return formArray.controls[i].errors && formArray.controls[i].touched;
  }

  getFieldError(field: string): string | null{

    if(!this.myForm.controls[field]) return '';
    const errors: any = this.myForm.controls[field].errors || {};

    for (const key of Object.keys(errors)){

      switch(key){
        case 'required':
          return "Este campo es requerido";
        case 'minlength':
          return `Campo con ${ errors['minlength'].requiredLength} caracteres minimo`;
      }
    }
    return null;
  }

onDeleteFavorite(i: number):void{
  this.favoriteGames.removeAt(i);
}

addToFavorites(){

  if(this.newFavorite.invalid)
    return;

  const newGame = this.newFavorite.value;

  this.favoriteGames.push(
    this.fb.control(newGame, Validators.required)
  );
  this.newFavorite.reset();
}
  onSubmit():void{
    console.log(this.myForm?.value);

    if(this.myForm.invalid){
      this.myForm.markAllAsTouched();
      return;
    }
    this.myForm.reset();
    (this.myForm.controls['favoriteGames'] as FormArray) = this.fb.array([]); 
  
  }
}
