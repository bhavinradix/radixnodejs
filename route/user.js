import express from 'express';
const userRouter = express.Router();

// To welcome the user.
userRouter.get('/', (req, res) => {
    res.send('Welcome to Radix Node Blog please register yourself if not or login to access the blog');
});

userRouter.post('/', (req, res) => {
    res.send('Welcome to Radix Node Blog please register yourself if not or login to access the blog');
});

// Create route for user registration.
userRouter.post('/register', (req, res) => {
    console.log(req.method);
});

// Create route for user login.
userRouter.post('/login', (req, res) => {
    console.log(req.method);
});

export default userRouter;