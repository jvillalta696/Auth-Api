export const createUser = () => { 
    const query = `INSERT INTO "USER" (username, password) VALUES (?, ?)`;
    return query;
 }

 export const getUsers = () => { 
    const query = `SELECT * FROM USER`;
    return query;
 }

 export const getUserByName = (usrname) => { 
    const query = `SELECT * FROM USER WHERE username = ?`;
    return query;
 }