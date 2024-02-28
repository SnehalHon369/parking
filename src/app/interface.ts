import { ESlotStatus } from "./enum";

export interface IUser {
    id?: number;
    username: string;
    password: string;
    companyName: string;
}

export interface ISlot {
    slotId: string;
    level: number;
    status: ESlotStatus;
    heldByUser?: number;
}

export interface ICompany {
    companyName: string;
    slots: number;
    level: number;
}