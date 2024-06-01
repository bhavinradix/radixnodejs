import express from 'express';
import { createUser, getUser } from '../controller/userController.js';
import bodyParser from 'body-parser';
import { body, validationResult } from 'express-validator';

const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({ extended : false});
const userRouter = express.Router();

// To welcome the user.
userRouter.get('/', (req, res) => {
    res.send('Welcome to Radix Node Blog please register yourself if not or login to access the blog');
});

userRouter.post('/', (req, res) => {
    res.send('Welcome to Radix Node Blog please register yourself if not or login to access the blog');
});

// To register new user.
userRouter.post('/register', jsonParser, [
        body('name', 'Please enter name.').notEmpty(),
        body('email','Please enter valid email').isEmail(),
        body('password','Please enter valid password').isStrongPassword(
            {
                minLength: 8,
                minUppercase: 1,
                minNumbers: 1,
                minSymbols: 1,
            }
        )
    ], (req, res) => {
        try{
            // Validate user data.
            const userValidate = validationResult(req);
            if(userValidate.isEmpty()){
                const userData = createUser(req.body.name,req.body.email,req.body.password);
                if(userData.statusCode == 403){
                    res.status(403).json({message : 'User already exist'});
                }else{
                    res.status(201).json({message : 'User registered successfully'});
                }
            }else{
                res.send({errors: userValidate.array()});
            }
        }catch(error){
            console.log(error);
            res.json({success: false});
        }
});

// To login user.
userRouter.post('/login', jsonParser, (req, res) => {
    const loginData = getUser(req.body.email,req.body.password);
    res.status(loginData.statusCode);
    res.json({message : loginData.message});
});

export default userRouter;