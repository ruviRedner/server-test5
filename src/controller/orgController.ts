import { Request, Response } from "express";
import {  sidInit } from "../services/orgService";

export const sid = async (req: Request, res: Response): Promise<void> => {
    try {
        await sidInit()
        res.sendStatus(201)
    } catch (error) {
        console.log(error);
        res.sendStatus(400)
        
    }
};