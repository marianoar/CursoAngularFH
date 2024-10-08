import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { debounceTime, Subject, Subscription } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styles: ``
})
export class SearchBoxComponent implements OnInit, OnDestroy{

  private debouncer: Subject<string> = new Subject<string>(); //algo asi como un observable

  private debouncerSubscription?: Subscription;

  @Input()
  public placeholder: string = "";

  @Output()
  // public onValue = new EventEmitter<string>();
  
  @Output()
  public onDebounce = new EventEmitter<string>();

  @Input()
  public initialValue : string = '';

  ngOnInit(): void {
    // el debounceTimer funciona como un delay, hasta que el observable deja d emitir valores por un seg
    this.debouncerSubscription = this.debouncer
    .pipe(
      debounceTime(750)
    )
    .subscribe(value=>{
      this.onDebounce.emit(value);
    })
  }

  ngOnDestroy(): void {
    console.log("destruido");
    this.debouncerSubscription?.unsubscribe();
    // todo lo que venga de peticiones http common no hace falta hacer unsubscription, se cancela automaticamente
  }

  // reemplazado por onDebounce
  // emitValue(value:string):void{
  //   this.onValue.emit(value);
  // }

  onKeyPress(search : string){
    this.debouncer.next(search);
  }
}
