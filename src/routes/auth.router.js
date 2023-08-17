import { Router } from "express";
import {signInUser, signUpUser,authenticateToken } from '../controllers/auth/auth.controller.js'

const router = Router();
router.get('/status',authenticateToken,(req,res)=>{res.json({status: "OK",id: req.userId})});
router.post('/signup',signUpUser);
router.post('/signin',signInUser);

export default router