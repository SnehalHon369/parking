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
    this.UserService.userLogin(this.username, this.password).then(loginStatus=>{
      if(loginStatus == 1) {
        // admin
        console.log("admin")
      } else if (loginStatus == 2) {
        // employee
        console.log("employee")
      } else {
        // invalid
        console.log("invalid")
      }
    });
    
  }
}
