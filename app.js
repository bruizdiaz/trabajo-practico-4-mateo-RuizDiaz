//------------------------------------//
//------------- IMPORT --------------//
//----------------------------------//
import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import { initDB } from './src/config/database.js';

const app = express();
const PORT = Number(process.env.PORT);

app.use(express.json);
app.use(morgan('dev'));

initDB();
app.listen(PORT, console.log(`Servidor escuchando en http://localhost:${PORT}`));
