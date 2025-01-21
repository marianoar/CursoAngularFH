import { Component, OnInit } from '@angular/core';
import { EmailValidator, FormBuilder, FormGroup, Validators } from '@angular/forms';
// import * as customValidators from '../../../shared/validators/validators';
import { ValidatorService } from '../../../shared/services/validators.service';
import { EmailValidatorService } from '../../../shared/validators/email-validator.sevice';

@Component({
  templateUrl: './register-page.component.html',
  styles: ``
})
export class RegisterPageComponent implements OnInit{

  public myForm!: FormGroup;

  constructor(private fb: FormBuilder, private validatorService: ValidatorService, private EmailValidator: EmailValidatorService){
    
  }
  ngOnInit(): void {
    this.myForm = this.fb.group({ // el deprecated era por el tipo esperado en el medoto de validacion de campos iguales
      name:['', [Validators.required, Validators.pattern(this.validatorService.firstNameAndLastnamePattern)]],
      email: ['', [Validators.required, Validators.pattern(this.validatorService.emailPattern)], [this.EmailValidator]],
      username: ['',[Validators.required, this.validatorService.cantBeStrider]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      password2: ['',[Validators.required]]
    },{
      validators: [
        this.validatorService.equalsFields('password', 'password2')
      ]
    })
  }

  isValidField(field:string){
    return this.validatorService.isValidField(this.myForm, field);
  }
  onSubmit(){
  this.myForm?.markAllAsTouched();
}
}
