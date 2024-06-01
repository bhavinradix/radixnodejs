import express from 'express';
import userRouter from './route/user.js';

const app = express();
const PORT = process.env.PORT;

// Below are the route to access user module.
app.use('/api/auth',userRouter);

app.listen(PORT,
    () => console.log(`Server is running on port ${PORT}`)
);