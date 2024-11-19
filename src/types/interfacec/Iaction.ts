import { Types } from "mongoose";
// import { Iorg } from "./Iorg";
export enum StatusAction{
    lanched="lanched",
    INTERCEPT="INTERCEPT",
    hit="hit",
   
}
export interface Iaction{
    teroristId:string | Types.ObjectId
    userId: string | Types.ObjectId
    status: StatusAction
    target: string
    timeHit: number
    misseilName:string
}