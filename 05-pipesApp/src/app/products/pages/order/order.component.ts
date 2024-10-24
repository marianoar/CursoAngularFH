import { Component } from '@angular/core';
import { Color, Hero } from '../../interfaces/hero.interface';

@Component({
  selector: 'products-order',
  templateUrl: './order.component.html',
  styles: ``
})
export class OrderComponent {

  public isUpperCase: boolean = false;
  public orderBy: keyof Hero | undefined | '';
  public order: boolean = true;

  public heroes: Hero[] = [
    {
      name: 'Superman', canFly: true, color: Color.blue
    },
    {
      name: 'Batman', canFly: true, color: Color.black
    },
    {
      name: 'Eddie', canFly: false, color: Color.red
    },
    {
      name: 'He-Man', canFly: false, color: Color.red
    },
    {
      name: 'Aquaman', canFly: false, color: Color.green
    },
    {
      name: 'Mazinger Z', canFly: true, color: Color.yellow
    }
  ]

  toggleUpperCase():void{
    this.isUpperCase = !this.isUpperCase;
  }

  changeOrder(value: keyof Hero): void{
    this.orderBy === value ? this.order = !this.order : (this.orderBy = value, this.order = true)
    // console.log(value);
  }
}
