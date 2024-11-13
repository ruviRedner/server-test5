import { Iorg } from "./Iorg"

export interface Iuser{
    username:string
    password:string
    org?:Iorg | string
    location?:string
    role:string
}