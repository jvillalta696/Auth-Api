import {createUserService, getUserByNameService} from '../../services/user.service.js';
import {comparePassword,hashPassword} from '../../libs/passwordUtils.js';
import jwt from'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
const sk = process.env.SECRET_KEY

export const signUpUser = async (req,res)=>{
    try {
        const { user, password} = req.body;
        
        const data = await getUserByNameService([user]);
        if (data.length > 0) {
            res.status(409).json({message: "Este usuario ya existe en la base de datos"})
        }else{
            const hashPsw = await hashPassword(password);
            await createUserService([user,hashPsw]);
            res.status(201).json({message: "Usuario creado con exito"})
        }
       
    } catch (error) {
        res.status(500).json({error: error.message})
    }   
    
}

export const signInUser = async (req,res)=>{
    try {
        const { user, password} = req.body;
        
        const data = await getUserByNameService([user]);
        if (data.length === 0) {
            res.status(401).json({message: "Credenciales incorrectos"})
        }else{
            const psw = data[0].password
            const userId = data[0].id
            const isValidPsw = await comparePassword(password,psw);
            if(isValidPsw){                
                const token = jwt.sign({ userId }, sk, { expiresIn: '1h' });
                // Envía el JWT en una cookie segura
                res.cookie('jwt', token, {
                    httpOnly: true,
                    //secure: true, // Solo en HTTPS
                    maxAge: 3600000, // 1 hora de duración
                });
                res.status(201).json({message: "Usuario inicio sesion con exito con exito",token})
            }else{
                res.status(401).json({message: "Credenciales incorrectos"})
            };           
        };       
    } catch (error) {
        res.status(500).json({error: error.message})
    }    
}

export const authenticateToken = (req, res, next) =>{
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, sk, (err, decoded) => {
            if (err) {
                return res.sendStatus(403); // Token inválido
            }
            req.userId = decoded.userId; // Agrega el ID del usuario al objeto de solicitud
            next();
        });
    } else {
        res.sendStatus(401); // Token no proporcionado
    }
}