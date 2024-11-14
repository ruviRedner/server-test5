import { Request, Response } from "express";
import { handelAttack, handleDefense } from "../services/actionService";
import { ActionDto } from "../types/DTO/actionDto";


export const attack = async (req: Request<any,any,ActionDto>, res: Response): Promise<void> => {
  try {
   const result = await handelAttack(req.body)
    res.status(201).json(result)
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
};
export const intercept = async (req: Request, res: Response): Promise<void> => {
    try {
     const result = await handleDefense(req.body);
      res.status(201).json(result);
    } catch (error) {
      console.log(error);
      res.sendStatus(400);
    }
  };