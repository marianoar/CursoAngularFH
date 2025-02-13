import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Directive({
  selector: '[customLabel]',
})
export class CustomLabelDirective implements OnInit {
  //la Directiva pasa por todos los ciclos de vida de un componente de Angular

  private htmlElement?: ElementRef<HTMLElement>; 
  private _color: string = "";
  private _errors?:ValidationErrors | null;

  @Input() set color(value:string){
    this._color = value;
    this.setStyle();
  }

  @Input() set errors(value: ValidationErrors | null | undefined){
    this._errors = value;
    console.log(value);
  }

  constructor(private el: ElementRef<HTMLElement>) {
    // console.log("ctor directiva");
    this.htmlElement = el;
  }

  ngOnInit(): void {
    this.setStyle();
  }

  setStyle(){
    if(!this.htmlElement)
      return;
    this.htmlElement.nativeElement.style.color= this._color;
  }

  setErrorMessage():void{
    if(!this.htmlElement)
      return;
    if(!this._errors){
      this.htmlElement.nativeElement.innerText = "No hay errores";
      return;
    }

    const errors = Object.keys(this._errors);

    if(errors.includes('required')){
      this.htmlElement.nativeElement.innerText = "Campo requerido";
      return;
    }

    if(errors.includes('minlength')){
      const min = this._errors!['minlength']['requeridLength'];
      const current = this._errors!['minlength']['actualLength']
      this.htmlElement.nativeElement.innerText= `Minimo ${current}/${min} caracteres`;
      return;
    }

    if(errors.includes('email')){
      this.htmlElement.nativeElement.innerText = 'Debe ingresar un mail valido';
      return;
    }
  }

}
