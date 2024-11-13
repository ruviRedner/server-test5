import { Router } from "express";
import { attack, intercept } from "../controller/actionController";

 const router = Router()

router.post("/attack",attack)
router.post("/intercept",intercept)



export default router