import { Router } from "express";
import { sid } from "../controller/orgController";

 const router = Router()

router.post("/sid",sid)



export default router