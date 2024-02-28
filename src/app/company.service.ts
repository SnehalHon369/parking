import { Injectable } from '@angular/core';
import { ICompany } from './interface';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  // companies: ICompany[];

  constructor() {
    // this.companies = []
  }

  public async addCompany(company: ICompany) {
    return await (await fetch(`http://localhost:3000/company`, {
      method:"POST",
      body:JSON.stringify(company)
    })).json()
  }

  public async getCompanies() {
    return await (await fetch("http://localhost:3000/company", {})).json()
  }

  public async getCompany(companyName: string) {
    const result = await fetch("http://localhost:3000/slots", {})
    const data = await result.json()

    return data.find((company:any) => {
      return company.companyName === companyName
    })
  }
}
