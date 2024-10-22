import { Component } from '@angular/core';

@Component({
  selector: 'app-uncommon-page',
  templateUrl: './uncommon-page.component.html',
  styleUrl: './uncommon-page.component.css'
})
export class UncommonPageComponent {

  //i18n Select
  public name : string = "Mariano";
  public gender: 'male' | 'female' | 'other' = 'male';
  public invitationMap = {
  'male': 'invitarlo',
  'female': 'invitarla'
} //ojo que si no hay una opcion va a quedar vacio (undefined)
  changeClient(){
    this.name = "Mariana";
    this.gender = "female";
  }
}
