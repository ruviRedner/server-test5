import { Router } from "express";
import { attack, getAction, intercept } from "../controller/actionController";
import verifyUser from "../middleware/VerifyUser";

 const router = Router()

router.post("/attack", verifyUser,attack)
router.post("/intercept",intercept)
router.get("/getAction",getAction)



export default router