import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  templateUrl: './switches-page.component.html',
  styles: ``
})
export class SwitchesPageComponent implements OnInit {

  public myForm!: FormGroup;

  public person = {
    gender: 'F',
    wantNotifications: false
  }

  constructor(private fb: FormBuilder){

  }

  ngOnInit(){
    this.myForm = this.fb.group({
      gender: ['M', Validators.required],
      wantNotifications: [true, Validators.required],
      termsConditions: [false, Validators.required]
    });

    this.myForm.reset(this.person);
  }

  onSave(){
    if(this.myForm.invalid){
      this.myForm.markAllAsTouched();
      return;
    }
    console.log(this.myForm.value)

    const { termsConditions, ...newPerson} = this.myForm.value;

    this.person = newPerson;
  }

  
  isValidField(field: string): boolean | null{
   // console.log(this.myForm.controls[field].errors);
    return this.myForm.controls[field].value == false;
    //&& this.myForm.controls[field].touched;
  }


}
