import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import { interval } from 'rxjs/internal/observable/interval';

@Component({
  selector: 'products-price',
  templateUrl: './price.component.html',
  styleUrl: './price.component.css'
})
export class PriceComponent implements OnInit, OnChanges, OnDestroy {

  @Input()
  public price: number = 0;

  public interval$?: Subscription; // el $ es nomenclatura para visualizar que es un Observable.

  ngOnInit(): void {
    console.log('PriceComponent ngOnInit.');

    this.interval$ = interval(1000).subscribe( v=> console.log(`Tick ${v}`));
  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log('PriceComponent ngOnChanges.');
    console.log({changes});
  }
  ngOnDestroy(): void {
    console.log('PriceComponent ngOnDestroy.');
    this.interval$?.unsubscribe();
  }


}
