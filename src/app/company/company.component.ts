import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { ICompany, IUser } from '../interface';
import { CompanyService } from '../company.service';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrl: './company.component.css'
})
export class CompanyComponent {
  company = ""
  username = ""
  password = ""

  usersList: IUser[] = []
  companyList: ICompany[] = [];


  constructor(
    private UserService: UserService,
    private CompanyService: CompanyService
  ) {
    this.UserService.getUsers().then(data => {
      this.usersList = data;
    })

    this.CompanyService.getCompanies().then(data => {
      this.companyList = data
    });
  }

  createUser() {
    if (this.company && this.username && this.password) {
      const user = {
        username: this.username,
        password: this.password,
        companyName: this.company,
      }

      this.UserService.addUser(user).then(data => {
        this.usersList.push(data)
        console.log("User Created: ", { user });
        this.company = "";
        this.username = "";
        this.password = "";
      })
      document.getElementById("closeModel")?.click()
    } else {
      alert("all fields are mandatory")
    }
  }
}
