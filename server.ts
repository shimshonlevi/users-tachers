import express, { Application } from 'express';
import userRouter from './routes/userRoutes.js';
import teacherRouter from './routes/teacherRoutes.js';
import adminRouter from './routes/adminRoutes.js';
import connectDb from './config/db.js';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 3000;

if (!process.env.MONGO_URI) {
    console.error('MONGO_URI is not defined in the environment variables');
    process.exit(1);
}

const app: Application = express();

connectDb();
app.use(express.json());
app.use('/teachers', teacherRouter);
app.use('/users', userRouter);
app.use('/admin', adminRouter);

app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`);
});
