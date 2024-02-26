import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan'; // Import the morgan package
import userRoutes from './routes/userRoutes.js';
import facilityRoutes from './routes/facilityRoutes.js';
import requestRoutes from './routes/requestRoutes.js';

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan('dev')); // Use morgan middleware in dev mode

app.use('/user', userRoutes);
app.use('/facility', facilityRoutes);
app.use('/request', requestRoutes);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
