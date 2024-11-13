import { Document } from "mongoose"

export interface Iorg extends Document{
    name:string
    resources:[
        {
            name:string
            amount:number
        }
    ]
    budget:number
}