import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { IUser } from '../interface';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrl: './company.component.css'
})
export class CompanyComponent {
  company=""
  username=""
  password=""

  constructor(
    private UserService: UserService
  ){}

  createUser() {
    const user = {
      username: this.username,
      password: this.password,
      companyName: '',
    }

    this.UserService.addUser(user).then(data=>{
      console.log("User Created: ", {user});
      this.company = "";
      this.username = "";
      this.password = "";
    })
    document.getElementById("closeModel")?.click()
  }
}
