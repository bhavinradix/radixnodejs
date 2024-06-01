import User from '../model/userModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// To create user.
const createUser = async function registerUser(userName,userEmail,userPassword){

    // Create hash for password.
    const isExist = await User.findOne({ where : { email: userEmail }});

    if(isExist === null){
        const passwordHash = bcrypt.hashSync(userPassword, 10);

        const newUser = await User.create({
            username: userName,
            email: userEmail,
            password: passwordHash
        });
    }else{
        return { message : 'User already exist', statusCode : 403 };
    }
}

// To login user.
const getUser = async function loginUser(userEmail, userPassword) {
    const loggedUsers = await User.findOne({ where : { email: userEmail }});
    const loggedUser = loggedUsers && loggedUsers[0] ? loggedUsers[0] : null;
    if(loggedUser === null){
        return { message : 'User not found', statusCode : 404 };
    }else{
        const isValid = bcrypt.compareSync(userPassword, loggedUser.password);
        if(isValid){
            const payload = {
                email: loggedUser.email
            };
            const secret = process.env.SECRET_KEY;
            const expireIn = { expiresIn: '1h' };
            const jwtToken = jwt.sign(payload, secret, expireIn);
            return { message : 'Login Successfully', statusCode : 200, token : jwtToken};
        }else{
            return { message : 'Invalid Credential', statusCode : 401 };
        }
    }
}

export { createUser , getUser};