import { Request, Response } from "express";


export const attack = async (req: Request, res: Response): Promise<void> => {
  try {
    
    res.sendStatus(201);
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
};
export const intercept = async (req: Request, res: Response): Promise<void> => {
    try {
      
      res.sendStatus(201);
    } catch (error) {
      console.log(error);
      res.sendStatus(400);
    }
  };