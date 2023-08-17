import {hash,compare} from 'bcrypt';

export const hashPassword = async (psw)=>{
    const saltRounds =  10;
    return hash(psw,saltRounds);
}

export const comparePassword = async (psw, hashedPsw)=>{
    return compare(psw,hashedPsw);
}