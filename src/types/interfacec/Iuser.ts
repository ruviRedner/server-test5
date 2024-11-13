import { Iorg } from "./Iorg"

export interface Iuser{
    username:string
    password:string
    org?:Iorg
    location?:string
    role:string
}