import { Iorg } from "../interfacec/Iorg"

export interface LoginDto{
    username:string
    password:string
}

export interface RegisterDto extends LoginDto{
    org?:Iorg | string
    location?:string
    role:string
    

}