import connectDB from './config/db.js';
import express, { json } from 'express';
import { config } from 'dotenv';
import cors from 'cors';
import noteRoutes from './routes/noteRoutes.js';




config();

const app = express();
connectDB();
app.use(cors());
app.use(json());

app.use('/', noteRoutes);


app.get('/', (req, res) => {
  res.send('API is running...');
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server is running on porst ${PORT}`)
})