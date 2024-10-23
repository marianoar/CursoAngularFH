import { Component } from '@angular/core';
import { interval, Observable, tap } from 'rxjs';

@Component({
  selector: 'app-uncommon-page',
  templateUrl: './uncommon-page.component.html',
  styleUrl: './uncommon-page.component.css'
})
export class UncommonPageComponent {

  //i18n Select
  public name: string = "Mariano";
  public gender: 'male' | 'female' | 'other' = 'male';
  public invitationMap = {
    'male': 'invitarlo',
    'female': 'invitarla'
  } //ojo que si no hay una opcion va a quedar vacio (undefined)

  changeClient() {
    this.name = "Mariana";
    this.gender = "female";
  }

  //i18n Plural
  public clients: string[] = ["Pepe", "Yañez", "Maria", "Carlos", "Vero", "Otro", "Angular"];
  public clientsMap = {
    '=0': 'no hay clientes ',
    '=1': 'tenemos 1 cliente',
    'other': 'tenemos # clientes'
  }
  borrarCliente(): void {
    this.clients.shift();
  }

  // JSON Pipe and keyValue Pipe
  public person = {
    name: 'Noissete',
    age: 14,
    address: 'Nuñez, Malos Aires'
  }

  //Async Pipia
  public myObservableTimer: Observable<number> = interval(2000).pipe(
    tap(value=> console.log('tap: ', value))
  );

  public promiseValue: Promise<string> = new Promise((resolve, reject) =>{
    setTimeout(()=>{
      resolve('Hay data en la promesa');
      console.log('Hay data en la promesa');
      this.person.name = "Cambio el nombre";
    }, 3500)
  });
}
