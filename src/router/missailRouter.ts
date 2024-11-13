import { Router } from "express";
import { sid } from "../controller/missailController";

 const router = Router()

router.post("/sid",sid)
router.get("/misseil",() => {})



export default router