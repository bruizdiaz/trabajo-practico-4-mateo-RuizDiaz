//------------------------------------//
//------------- IMPORT --------------//
//----------------------------------//
import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

// Character Data Model
const Character = sequelize.define('Character', {
	name: {
		type: DataTypes.STRING(50),
		allowNull: false,
		unique: true,
	},
	ki: {
		type: DataTypes.INTEGER(20),
		allowNull: false,
	},
	race: {
		type: DataTypes.STRING(30),
		allowNull: false,
	},
	gender: {
		type: DataTypes.STRING(10),
		allowNull: false,
	},
	description: {
		type: DataTypes.STRING,
		allowNull: true,
	},
});

await Character.sync();

export default Character;
