import { NextFunction, Request, Response } from "express";
import jwt, { TokenExpiredError} from "jsonwebtoken";
import RequestWithUser from "../types/interfacec/RequestWithUser";
import TokenPayloadDTO from "../types/DTO/payload";



const verifyUser = async (
    req: RequestWithUser | Request,
    res: Response,
    next: NextFunction
) => {
    try {    
        const token: string =  req.headers["authorization"] as string;
        const payload: TokenPayloadDTO = jwt.verify(token, process.env.TOKEN_SECRET as string) as TokenPayloadDTO
        (req as RequestWithUser).user = payload
        next()
    } catch (err) {
        if (err instanceof TokenExpiredError) {
            res.status(401).json({
                err: true,
                message: "Token expiered, please log in again",
                data: err
            })
        } else {
            res.status(400).json({
                err: true,
                message: "Token is missing or curropted",
                data: err
            })
        }
    }
}

export default verifyUser