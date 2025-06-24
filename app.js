//------------------------------------//
//------------- IMPORT --------------//
//----------------------------------//
import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import { initDB } from './src/config/database.js';
import characterRoutes from './src/routes/character.routes.js';
import morgan from 'morgan';

const app = express();
const PORT = Number(process.env.PORT);

app.use(morgan('dev'));
app.use(express.json());
app.get('', (req, res) => {
	res.send('Hola');
});
app.use('/api', characterRoutes);

initDB().then(() => {
	app.listen(PORT, () => {
		console.log(`Servidor corriendo en http://localhost:${PORT}`);
	});
});
