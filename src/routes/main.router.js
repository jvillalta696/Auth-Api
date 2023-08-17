import { Router } from "express";
import user from './user.router.js';
import auth from './auth.router.js'

const router = Router();
router.get('/status',(req,res)=>{res.json({status: "OK"})});
router.use('/user',user)
router.use('/auth',auth)

export default router