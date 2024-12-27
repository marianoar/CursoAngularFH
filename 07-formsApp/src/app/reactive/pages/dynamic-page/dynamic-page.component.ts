import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  templateUrl: './dynamic-page.component.html',
  styles: ``
})
export class DynamicPageComponent implements OnInit{

  public myForm!: FormGroup;
  constructor(private fb: FormBuilder){

  }
  ngOnInit(): void {
    this.myForm = this.fb.group({
      nam:['',[Validators.required, Validators.minLength(3)]],
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

  getFieldError(field: string): string | null{

    if(!this.myForm.controls[field]) return '';
    const errors: any = this.myForm.controls[field] || {};
    console.log(errors);
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

  isValidFieldInArray(formArray: FormArray, i: number){
    return formArray.controls[i].errors && formArray.controls[i].touched;
  }

  onSubmit():void{
    console.log(this.myForm?.value);

    if(this.myForm?.invalid){
      this.myForm.markAllAsTouched();
      return;
    }
  }

}
