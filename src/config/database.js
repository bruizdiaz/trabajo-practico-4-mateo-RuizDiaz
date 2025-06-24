//------------------------------------//
//------------- IMPORT --------------//
//----------------------------------//
import dotenv from 'dotenv';
dotenv.config();
import { Sequelize } from 'sequelize';

// DB Connection
const sequelize = new Sequelize(
	process.env.DB_NAME,
	process.env.DB_USER,
	process.env.DB_PASSWORD,
	{
		host: process.env.DB_HOST,
		dialect: process.env.DB_DIALECT,
	},
);

//DB initialization
export const initDB = async () => {
	try {
		await sequelize.authenticate();
		console.log('Conexión a MySQL establecida.');
		await sequelize.sync();
	} catch (err) {
		console.error('Error al conectar a la base de datos:', err);
	}
};

export default sequelize;
