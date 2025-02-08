import { AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, Component, DoCheck, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'products-product-page',
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit, 
                                         OnChanges, 
                                         DoCheck, 
                                         AfterContentInit, 
                                         AfterContentChecked, 
                                         AfterViewInit, 
                                         AfterViewChecked, 
                                         OnDestroy {

  public esProductVisible: boolean = false;
  public currentPrice: number = 10;

  constructor(){
    console.log('Constructor');
    //inicializaciones
    // no hacer peticiones http en el constructor
  }
  ngOnInit(): void {
    console.log('ngOnInit.');
    // primer peticion http
    // implementar los subcribe
    // escuchar websockets
  }
  ngOnChanges(changes: SimpleChanges): void { //
    console.log(changes);
    console.log('ngOnChanges.');
    // estar pendiente de los cambios de las propiedades Input()
  }
  ngDoCheck(): void {
    console.log('ngDoCheck.');
  }

  //estos son poco usados, en general en implementaciones espcificas de algun paquete que lo pida
  ngAfterContentChecked(): void {
    console.log('ngAfterContentChecked');
  }
  ngAfterViewChecked(): void {
    console.log('ngAfterViewChecked.');
  }
  ngAfterViewInit(): void {
    console.log('ngAfterViewInit.');
  }
  ngAfterContentInit(): void {
    console.log('ngAfterContentInit.');
  }

  // limpiezas de listener, timer, observable, procesos que se ejecutan durante la presencia del componente
  ngOnDestroy(): void {
    console.log('ngOnDestroy.');
  }

  increasePrice(){
    this.currentPrice++;
  }
}
