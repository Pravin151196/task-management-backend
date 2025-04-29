import express from "express";
import { signup, login, verify, logout } from "../controllers/authController.js";

const router = express.Router();

router.post("/signup", (req, res, next) => {
    console.log('🚀 Frontend hit the /signup route');
    next(); // important: call next() to move to controller (signup function)
  }, signup);
router.post("/login", login);
router.get("/verify", verify);
router.post("/logout", logout);

export default router;
