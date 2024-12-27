import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  templateUrl: './basic-page.component.html',
  styles: ``
})
export class BasicPageComponent implements OnInit{

  public myForm!: FormGroup;

  constructor(private fb: FormBuilder){}
  
  ngOnInit(): void{
    this.myForm = this.fb.group({
      name:['', [Validators.required, Validators.minLength(3)]],
      price:[0, [Validators.required, Validators.min(0)]],
      inStorage:[0, [Validators.required, Validators.min(0)]]
    })
  }

  isValidField(field: string): boolean | null{
    return this.myForm.controls[field].errors && this.myForm.controls[field].touched;
  }

  getFieldError(field: string): string | null{

    if(!this.myForm.controls[field]) 
      return null;
    
    const errors: any = this.myForm.controls[field].errors || {};

    for (const key of Object.keys(errors)){
      switch(key){
        case 'required':
          return "Este campo es requerido";
        case 'minlength':
          return `Campo con ${ errors['minlength'].requiredLength} caracteres mínimo`;
      }
    }
    return null;
  }

  onSave():void{
    if(this.myForm.invalid){
      this.myForm.markAllAsTouched();
      return;
    }
    // this.myForm.reset({price:10, inStorage: 15});
  }
}
