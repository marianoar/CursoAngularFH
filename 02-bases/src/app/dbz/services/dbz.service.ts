import { Injectable } from '@angular/core';
import { v4 as uuid } from 'uuid';
import { Character } from '../interfaces/character.interface';

@Injectable({
  providedIn: 'root'
})
export class DbzService {

  constructor() { }

  public characters: Character[] = [{
    id: uuid(),
    name: "batman",
    power: 150
  },
  {
    id: uuid(),
    name: "aquaman",
    power: 304
  }, {
    id: uuid(),
    name: 'tercer',
    power: 330
  }

  ];

  public addCharacter(character: Character): void {

    const newCharacter={
      id: uuid(),
      ...character
    }

    this.characters.push(character);
  }
  onDeleteCharacter(index: number) {
    this.characters.splice(index, 1); //indice, cuantas posiciones delete
  }

  deleteCharacterById( id:string){
    this.characters = this.characters.filter(ch => ch.id!=id);
  }

}
