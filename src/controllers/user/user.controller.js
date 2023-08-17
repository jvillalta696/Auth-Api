import {createUserService, getuserService} from '../../services/user.service.js';
import {comparePassword,hashPassword} from '../../libs/passwordUtils.js';

export const createUser = async (req,res)=>{
    try {
        const { user, password} = req.body;
        const hashPsw = await hashPassword(password);
        await createUserService([user,hashPsw]);
        res.status(201).json({message: "Usuario creado con exito"})
    } catch (error) {
        res.status(401).json({error: error.message})
    }   
    
}

export const getUsers = async(req,res)=>{
    try {
        const rows = await getuserService();
        res.status(200).json({message: rows}) 
    } catch (error) {
        res.status(401).json({error: error.message})
    }
    
}