import { Router } from "express";
import { getProfile, login, register } from "../controller/userController";

 const router = Router()

router.post("/register",register)

router.post("/login",login)

router.post("/profile",getProfile)
export default router