import { Injectable } from '@angular/core';
import { ISlot } from './interface';
import { ESlotStatus } from './enum';

@Injectable({
  providedIn: 'root'
})
export class SlotService {
  // slots: ISlot[];
  // readonly LEVEL = [20, 25, 25]; // 20 slots for 0th level

  constructor() {
    // this.slots = [];
    // for (let level = 0; level < this.LEVEL.length; level++) {
    //   for (let slot = 0; slot < this.LEVEL[level]; slot++) {
    //     this.slots.push({
    //       slotId: `L${level} - S${slot}`,
    //       level,
    //       status: ESlotStatus.available
    //     })
    //   }
    // }
  }

  public async getSlots() {
    return await (await fetch("http://localhost:3000/slots", {})).json()
  }

  public async getSlot(slotId: string) {
    const result = await fetch("http://localhost:3000/slots", {})
    const data = await result.json()

    return data.find((slot: any) => {
      return slot.slotId === slotId
    })
  }

  public async getAvailableSlotsForCompany(companyName: string) {
    const companyResult = await fetch("http://localhost:3000/company", {})
    const companyData = await companyResult.json()

    const company = companyData.find((company: any) => {
      return company.companyName === companyName
    })

    const { slots, level } = company;

    const slotsResult = await fetch("http://localhost:3000/slots", {})
    const slotsData = await slotsResult.json()

    const slotsOfLevel =  slotsData.filter((slot: any) => {
      return slot.level === level
    })

    return slotsOfLevel;
  }

  public async isSlotAllocated(slotId: string) {
    const result = await fetch("http://localhost:3000/slots", {})
    const data = await result.json()

    const slot = data.find((slot: any) => {
      return slot.slotId === slotId
    })

    if (slot) {
      return slot.status === ESlotStatus.available;
    }
    return false;
  }

  public async allocateSlot(slotId: string) {
    const result = await fetch("http://localhost:3000/slots", {})
    const data = await result.json()

    const slot = data.find((slot: any) => {
      return slot.slotId === slotId
    })

    if (slot) {
      slot.status = ESlotStatus.occupied;
    }

    return await (await fetch(`http://localhost:3000/slots/${slot.id}`, {
      method: "PATCH",
      body: JSON.stringify(slot)
    })).json()
  }
  
  public async deAllocateSlot(slotId: string) {
    const result = await fetch("http://localhost:3000/slots", {})
    const data = await result.json()

    const slot = data.find((slot: any) => {
      return slot.slotId === slotId
    })

    if (slot) {
      slot.status = ESlotStatus.available;
    }

    return await (await fetch(`http://localhost:3000/slots/${slot.id}`, {
      method: "PATCH",
      body: JSON.stringify(slot)
    })).json()
  }
}
