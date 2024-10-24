import { Pipe, PipeTransform } from '@angular/core';
import { Hero } from '../interfaces/hero.interface';

@Pipe({
  name: 'sortBy'
})
export class SortByPipe implements PipeTransform {

  transform(heroes: Hero[], sortBy?: keyof Hero | '', order?: boolean): Hero[] { //tipado estricto y flexible
    
    console.log({heroes, sortBy});
    switch(sortBy){
      case 'name':
        return order 
          ? heroes.sort((a,b) => (a.name > b.name) ? 1 : -1)
          : heroes.sort((a,b) => (a.name < b.name) ? 1 : -1);
          break;
      case 'canFly':
        return order
          ? heroes.sort((a,b) => (a.canFly > b.canFly) ? 1 : -1)
          : heroes.sort((a,b) => (a.canFly < b.canFly) ? 1 : -1);
          break;
      case 'color':
        return order
          ? heroes.sort((a,b) => (a.color > b.color) ? 1 : -1)
          : heroes.sort((a,b) => (a.color < b.color) ? 1 : -1);
          break;
      default:
        return heroes;
    }

  }

}
