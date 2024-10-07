import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { debounceTime, Subject } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styles: ``
})
export class SearchBoxComponent implements OnInit{

  private debouncer: Subject<string> = new Subject<string>(); //observable

  @Input()
  public placeholder: string = "";

  @Output()
  public onValue = new EventEmitter<string>();
  
  @Output()
  public onDebounce = new EventEmitter<string>();

  ngOnInit(): void {
    // el debounceTimer funciona como un delay, hasta que el observable deja d emitir valores por un seg
    this.debouncer
    .pipe(
      debounceTime(750)
    )
    .subscribe(value=>{
      this.onDebounce.emit(value);
    })
  }

  emitValue(value:string):void{
    this.onValue.emit(value);
  }

  onKeyPress(search : string){
    this.debouncer.next(search);
  }
}
