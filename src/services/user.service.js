import {executeQueryWithParams,executeQueryWithOutParams} from '../db/dbAdmin.js'
import {createUser, getUserByName, getUsers} from '../db/queries.js'

export const createUserService = async (params)=>{
    const query = createUser();
    const result = await executeQueryWithParams(query, params);
    return result;
}

export const getuserService = async ()=>{
    const query = getUsers();
    const result = await executeQueryWithOutParams(query);
    return result;
}

export const getUserByNameService = async(params) =>{
    const query = getUserByName();
    const result = await executeQueryWithParams(query,params);
    return result;
} 