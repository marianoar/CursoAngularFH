import { Component, computed, signal } from '@angular/core';

//puedo tener una señal asi suelta fuera del componente
const name = signal('Mariano'); 

@Component({
  templateUrl: './counter-page.component.html',
  styleUrl: './counter-page.component.css'
})
export class CounterPageComponent {

  public counter = signal(10);

  public squareCounter = computed(()=> this.counter() * this.counter()); // solo lectura

  constructor(){
    console.log(name);
  }

  increaseBy(value: number) {
    this.counter.update(current => current - value);
  }
  decreaseBy(value: number){
    this.counter.update(c => c + value);
  }
}
