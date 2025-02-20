import { Component, computed, effect, OnDestroy, OnInit, signal } from '@angular/core';
import { User } from '../../interfaces/user-request.interface';

@Component({
  templateUrl: './properties-page.component.html',
  styleUrl: './properties-page.component.css'
})
export class PropertiesPageComponent implements OnInit, OnDestroy {


  ngOnInit(): void {
    setInterval(()=>{
      this.counter.update(current => current + 1);
    }, 1000)
  }

  ngOnDestroy(): void {
    // this.userChangedEffect.destroy();
  }

  public user = signal<User>({
    "id": 2,
    email: "janet.weaver@reqres.in",
    first_name: "Janet",
    last_name: "Weaver",
    avatar: "https://reqres.in/img/faces/2-image.jpg"
  });

  public fullName = computed(() => `${this.user().first_name} ${this.user().last_name}`);

  // Para que el effect tenga el comportamiento deseado se debe de evitar la mutación de los objetos 
  // en las signal que son dependencias, y regresar una nueva referencia del objeto.
  // por eso en el switch aplico un structuredClone en el return del update, 
  // supongo que al hacer eso, cambia la referencia del objeto, y angular trigerea el effecto

  public userChangedEffect = effect(() => {
    console.log( `effect ${this.user().first_name} - ${this.counter()}`);
  })

  public counter = signal(10);

  onFieldUpdated(field: keyof User, value: string) {
    // console.log(field + " " + value);

    //esto seria inseguro pues si no existe la propertie la generaria
    // this.user.set({
    //   ...this.user(),
    //   [field]:value,
    // })

    this.user.update(current => {

      switch (field) {
        case 'email':
          current.email = value;
          break;
        case 'first_name':
          current.first_name = value;
          break;
        // y asi con todas las propiedades del objeto
      }
      return structuredClone(current);
    })
  }

  increaseBy(value: number) {
    this.counter.update(current => current + value);
  }
}
