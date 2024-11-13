import { Request } from "express";
import PayloadDto from "../DTO/payload"

export default interface RequestWithUser extends Request{
    user:PayloadDto
}