import { Component } from '@angular/core';

import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username:string=""
  password:string=""

  constructor(
    private UserService: UserService,
  ) {

  }

  login():void {
    this.UserService.userLogin(this.username, this.password).then(data=>{
      if(data.status == 1) {
        // admin
        console.log("admin")
        window.location.href="/dashboard"
      } else if (data.status == 2) {
        // employee
        console.log("employee")
        localStorage.setItem("user", JSON.stringify(data.user) )
        window.location.href="/employee"
      } else {
        // invalid
        console.log("invalid")
      }
    });
    
  }
}
