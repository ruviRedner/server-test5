import { Types } from "mongoose";
export enum StatusAction{
    lanched="lanched",
    INTERCEPT="INTERCEPT",
    hit="hit",
   
}
export interface Iaction{
    terorestId:string | Types.ObjectId
    userId: string | Types.ObjectId
    status: StatusAction
    location: string 
    timeHit: Date
}