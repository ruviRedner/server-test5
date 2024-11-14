import { Document } from "mongoose"
import { Iorg } from "./Iorg"

export interface Iuser extends Document{
    username:string
    password:string
    org?:Iorg 
    location?:string
    role:string
}