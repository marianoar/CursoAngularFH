import { Component } from '@angular/core';

@Component({
  selector: 'app-heroes-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent {

  public heroNames: string[] = ['he man', 'batman', 'mazinger z', 'aquaman'];
public deleted: string | undefined ='';
  removeLast(): string | undefined{
    this.deleted = this.heroNames.pop();
    return this.deleted;
  }
}
