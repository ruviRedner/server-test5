import { Types } from "mongoose";

export interface ActionDto{
    teroristId: string|Types.ObjectId
    misseil:string 
    location:string 
}
export interface InterceptDto{
    targetId: string|Types.ObjectId
    interceptId:string|Types.ObjectId
    misseil:string 
}