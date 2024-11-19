import bcrypt from "bcryptjs";


interface User{
    username: string;
    email: string;
    passwordHash: string;
}

const users: User[] = []

export const addUser = async (username: string, email: string, password: string) => {
    const passwordHash = await bcrypt.hash(password, 10);
    users.push({ username, email, passwordHash });
};
  
export const findUser = (email:string): User | undefined =>{
    return users.find((user)=> user.email === email);
}

export const verifyPassword =async (password: string, passwordHash:string) =>{
    return await bcrypt.compare(password,passwordHash)
}