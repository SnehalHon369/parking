import { ESlotStatus } from "./enum";

export interface IUser {
    id?: string;
    username: string;
    password: string;
    companyName: string;
    allocatedSlot?:string;
}

export interface ISlot {
    slotId: string;
    level: number;
    status: ESlotStatus;
    heldByUser?: number;
    id?:string;
}

export interface ICompany {
    companyName: string;
    slots: number;
    level: number;
}