import { Component } from '@angular/core';
import { CompanyService } from '../company.service';
import { ICompany } from '../interface';
import { SlotService } from '../slot.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  companyName=""
  level=""
  slotsAllocated=""
  companyList:ICompany[] = [];

  constructor(
    private CompanyService: CompanyService,
    private SlotService: SlotService,
  ) {
    this.CompanyService.getCompanies().then(data=>{
      this.companyList = data
    });

    // -----------------for slots------------------------

    // this.SlotService.getSlots().then(data=>{
    //   console.log(data)
    // })

    // this.SlotService.getSlot("L1 - S0").then(data=>{
    //   console.log(data)
    // })

    // this.SlotService.isSlotAllocated("L0 - S0").then(data=>{
    //   console.log(data)
    // })
    
    // this.SlotService.allocateSlot("L0 - S0", 678).then(data=>{
    //   console.log(data)
    // })
  }

  createCompany() {
    if(!Number.isNaN(parseInt(this.slotsAllocated)) && !Number.isNaN(parseInt(this.level))) {
      const company:ICompany = {
        companyName: this.companyName,
        slots: parseInt(this.slotsAllocated),
        level: parseInt(this.level)
      }
      this.CompanyService.addCompany(company).then(data=>{
        this.companyList.push(data)
        console.log("Company Created: ", {company})
        this.companyName = ""
        this.slotsAllocated = ""
        this.level=""
      })
      document.getElementById("closeModel")?.click()
    }
  }
}
