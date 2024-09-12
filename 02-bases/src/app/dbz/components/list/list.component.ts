import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Character } from '../../interfaces/character.interface';

@Component({
  selector: 'dbz-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent {

  @Input("misPersonajes") //le seteo el nombre con que quiero bindear
  public characterList: Character[]=[{
    name:"Personaje",
    power:10
  }];

  @Output()
  public onDelete : EventEmitter<string> = new EventEmitter();

  onDeleteCharacter(id? :string):void{
    if(!id) return;
    this.onDelete.emit(id);
  }
}
