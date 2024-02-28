import { Component } from '@angular/core';
import { SlotService } from '../slot.service';
import { ISlot, IUser } from '../interface';
import { UserService } from '../user.service';

declare var $: any;

@Component({
  selector: 'app-emploee',
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css'
})
export class EmployeeComponent {
  slotsList: ISlot[] = [];
  loginUser?: IUser;
  alreadyAllocated: any = false;
  constructor(
    private SlotService: SlotService,
    private UserService: UserService
  ) {
    try {
      this.loginUser = JSON.parse(localStorage.getItem("user") || "")
      if (!this.loginUser) {
        window.location.href = "/login"
      }

      if (this.loginUser) {
        this.SlotService.getAvailableSlotsForCompany(this.loginUser?.companyName).then(data => {
          this.slotsList = data;
          console.log({ data })
        })
      }

      this.initial()

    } catch {
      window.location.href = "/login"
    }
  }

  initial() {
    if (this.loginUser) {
      const userId = this.loginUser.id;
      if (userId) {
        this.UserService.getUserById(userId).then(data => {
          if (data) {
            if (data.allocatedSlot) {
              this.alreadyAllocated = data.allocatedSlot;
            }
          } else {
            alert("problem to perform operation")
          }
        })
      }
    } else {
      window.location.href = "/login"
    }
  }

  bookSlot() {
    const slots: any = document.forms[0].slot;
    if (slots) {
      if (slots.value) {
        console.log(slots.value)
        this.SlotService.allocateSlot(slots.value).then(data => {
          console.log({ data })
          this.initial()
        })
        this.UserService.updateUserSlot(this.loginUser!.id!, slots.value).then(data => {
          console.log({ data })
          this.initial()
        })
      } else {
        alert("please select any slot")
      }
    }
  }

  logout() {
    if (this.alreadyAllocated) {
      console.log(this.alreadyAllocated)
      Promise.all([this.SlotService.deAllocateSlot(this.alreadyAllocated), this.UserService.updateUserSlot(this.loginUser!.id!, "")]).then(data => {
        console.log({ data })
        this.alreadyAllocated=false;
        // this.initial()
        location.href = "/login"
      }).catch(e=>{
        console.log("unable to deallocate slot: ", e);
        alert("unable to deallocate");
      })
    } else {
      localStorage.clear()
      location.href = "/login"
    }
  }
}
