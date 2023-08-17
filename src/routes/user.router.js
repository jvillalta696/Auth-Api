import { Router } from "express";
import {createUser, getUsers} from '../controllers/user/user.controller.js'

const router = Router();
router.get('/status',(req,res)=>{res.json({status: "OK"})});
router.post('/',createUser);
router.get('/',getUsers);

export default router