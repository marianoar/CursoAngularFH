import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  templateUrl: './basic-page.component.html',
  styles: ``
})
export class BasicPageComponent implements OnInit{

  public myForm!: FormGroup;

  constructor(private fb: FormBuilder){}
  
  ngOnInit(){
    this.myForm = this.fb.group({
      name:['', [Validators.required, Validators.minLength(3)]],
      price:[0, [Validators.required, Validators.min(0)]],
      inStorage:[0, [Validators.required, Validators.min(0)]]
    })
  }

  onSave():void{
    console.log(this.myForm.value);
  }
}
