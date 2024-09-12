import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  
  title = 'my titulo';
  public counter : number = 10;
  
  public increaseBy(value: number):void{
    this.counter+= value;
  }
  decreaseBy() {
    this.counter-=1;
  }
  reset() {this.counter = 10;}
}
