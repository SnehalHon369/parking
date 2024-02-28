import { Injectable } from '@angular/core';
import { IUser } from './interface';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  // users: IUser[] = [];

  constructor() {
    // this.users = []
  }

  public async addUser(user: IUser) {
    return await (await fetch(`http://localhost:3000/users`, {
      method:"POST",
      body:JSON.stringify(user)
    })).json()
  }

  public async getUsers() {
    return await (await fetch("http://localhost:3000/users", {})).json()
  }

  public async getUserById(userId: number) {
    return await (await fetch(`http://localhost:3000/users/${userId}`, {})).json()
  }

  public async userLogin(username: string, password: string){ //successful/unseccessful: 1 = admin, 2 = user, 3 = invalid cerdentials
    if (username === "admin" && password === "admin@123") {
      return 1;
    }
    
    const users = await (await fetch("http://localhost:3000/users/", {})).json()

    let user: (IUser | undefined);
    if(users) {
      user = users.find((user: IUser) => {
        return user.username === username;
      })
    } else {
      return 3;
    }

    if (user) {
      if (user.password === password) {
        return 2;
      }
    }
    return 3;
  }
}
