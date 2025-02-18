import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { UsersServiceService } from '../../services/usersService.service';
import { User } from '../../interfaces/user-request.interface';

@Component({
  templateUrl: './userinfo-page.component.html',
  styleUrl: './userinfo-page.component.css'
})
export class UserinfoPageComponent implements OnInit {
  
  private usersService = inject(UsersServiceService);
  
  public userId = signal(1);
  
  public currentUser = signal<User | undefined>(undefined);
  
  public userWasFound = signal(true);

  public fullName = computed<string>(()=>{
    if(!this.currentUser())
      return 'User not found';
    return `${this.currentUser()?.last_name}, ${this.currentUser()?.first_name}`;
  })
  
  ngOnInit(): void {
    this.loadUser(this.userId())
  }

  loadUser(id:number){
    if(id<=0)
      return;
    this.currentUser.set(undefined); // para que visualmente se vea mas dinamico, sin el delay de la llamada
    this.userId.set(id);
     this.usersService.getUserById(id).subscribe(
      //user=> {
    //   console.log({user});
    //   this.currentUser.set(user);
    {
      next: (user)=>{
      this.currentUser.set(user);
      this.userWasFound.set(true);
      },
      error: ()=>{
        this.userWasFound.set(false),
        this.currentUser.set(undefined)
      }
    })
  }

}
