import { Component, computed, signal } from '@angular/core';
import { User } from '../../interfaces/user-request.interface';

@Component({
  templateUrl: './properties-page.component.html',
  styleUrl: './properties-page.component.css'
})
export class PropertiesPageComponent {

  public user = signal<User>({"id": 2,
        email: "janet.weaver@reqres.in",
        first_name: "Janet",
        last_name: "Weaver",
        avatar: "https://reqres.in/img/faces/2-image.jpg"});

  public fullName = computed( ()=> `${this.user().first_name} ${this.user().last_name}`);

  onFieldUpdated(field: keyof User, value: string) {
    console.log(field + " " + value);

    //esto seria inseguro pues si no existe la propertie la generaria
    // this.user.set({
    //   ...this.user(),
    //   [field]:value,
    // })

    this.user.update( current => {

      switch (field){
        case 'email':
          current.email=value;
          break;
          case 'first_name':
            current.first_name = value;
          // y asi con todas las propiedades del objeto
      }
      return current;
    })
  }
}
