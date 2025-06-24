//------------------------------------//
//------------- IMPORT --------------//
//----------------------------------//
import Character from '../models/character.model.js';
import { Op } from 'sequelize'; // Para usar operadores de Sequelize

// --- FUNCIÓN DE AYUDA (HELPER) ---
const capitalize = (str) => {
	if (typeof str !== 'string' || str.length === 0) return '';
	return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

// --- OBTENER TODOS LOS PERSONAJES ---
export const getCharacters = async (req, res) => {
	try {
		const characters = await Character.findAll({
			attributes: { exclude: ['id', 'createdAt', 'updatedAt'] },
		});
		res.json(characters);
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: 'Ocurrió un error interno en el servidor.' });
	}
};

// --- OBTENER UN PERSONAJE POR ID ---
export const getCharacterByID = async (req, res) => {
	try {
		const { id } = req.params;
		const character = await Character.findByPk(id);

		if (!character) {
			return res.status(404).json({ message: 'Personaje no encontrado.' });
		}

		res.status(200).json(character);
	} catch (error) {
		console.log(error);

		res.status(500).json({ message: 'Ocurrió un error interno en el servidor.' });
	}
};

// --- CREAR UN NUEVO PERSONAJE ---
export const createCharacter = async (req, res) => {
	try {
		let { name, ki, race, gender, description } = req.body;
		const errors = [];
		if (typeof name !== 'string' || name.trim() === '')
			errors.push({ message: 'El nombre es obligatorio y debe ser texto.' });
		if (typeof ki !== 'number')
			errors.push({ message: 'El Ki es obligatorio y debe ser un número.' });
		if (typeof race !== 'string' || race.trim() === '')
			errors.push({ message: 'La raza es obligatoria y debe ser texto.' });
		if (typeof gender !== 'string' || gender.trim() === '')
			errors.push({ message: 'El género es obligatorio y debe ser texto.' });

		if (errors.length > 0) return res.status(400).json({ errors });

		const formattedName = capitalize(name.trim());
		const formattedRace = capitalize(race.trim());
		const formattedGender = capitalize(gender.trim());
		const formattedKi = Math.trunc(ki);

		const validGenders = ['Male', 'Female'];
		if (!validGenders.includes(formattedGender)) {
			errors.push({ message: 'El género solo puede ser "Male" o "Female".' });
		}

		const existingCharacter = await Character.findOne({ where: { name: formattedName } });
		if (existingCharacter) {
			errors.push({ message: 'Ya existe un personaje con ese nombre.' });
		}

		if (errors.length > 0) return res.status(400).json({ errors });

		const newCharacter = {
			name: formattedName,
			ki: formattedKi,
			race: formattedRace,
			gender: formattedGender,
			description: description || '',
		};
		const character = await Character.create(newCharacter);

		res
			.status(201)
			.json({ message: 'Personaje creado exitosamente', character: character });
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: 'Ocurrió un error interno en el servidor.' });
	}
};

// --- ACTUALIZAR UN PERSONAJE ---
export const updateCharacter = async (req, res) => {
	try {
		const { id } = req.params;
		let { name, ki, race, gender, description } = req.body;
		const errors = [];

		// 1. Verificar si el personaje existe
		const character = await Character.findByPk(id);
		if (!character) {
			return res.status(404).json({ message: 'Personaje no encontrado.' });
		}

		// 2. Validaciones de tipo y existencia (similar a create)
		if (typeof name !== 'string' || name.trim() === '')
			errors.push({ message: 'El nombre es obligatorio y debe ser texto.' });
		if (typeof ki !== 'number')
			errors.push({ message: 'El Ki es obligatorio y debe ser un número.' });
		if (typeof gender !== 'string' || gender.trim() === '')
			errors.push({ message: 'El género es obligatorio y debe ser texto.' });
		if (typeof race !== 'string' || race.trim() === '')
			errors.push({ message: 'La raza es obligatoria y debe ser texto.' });

		if (errors.length > 0) return res.status(400).json({ errors });

		// 3. Formateo y Normalización
		const formattedName = capitalize(name.trim());
		const formattedGender = gender ? capitalize(gender.trim()) : undefined;

		// 4. Validaciones avanzadas
		if (formattedGender && !['Male', 'Female'].includes(formattedGender)) {
			errors.push({ message: 'El género solo puede ser "Male" o "Female".' });
		}

		const existingCharacter = await Character.findOne({
			where: {
				name: formattedName,
				id: { [Op.ne]: id }, // [Op.ne] significa "not equal" (no igual)
			},
		});
		if (existingCharacter) {
			errors.push({ message: 'Ya existe otro personaje con ese nombre.' });
		}

		if (errors.length > 0) return res.status(400).json({ errors });

		// 5. Actualización
		character.name = formattedName;
		character.ki = Math.trunc(ki);
		if (race) character.race = capitalize(race.trim());
		if (gender) character.gender = formattedGender;
		if (description !== undefined) character.description = description;

		await character.save();

		res.status(200).json({ message: 'Personaje actualizado exitosamente', character });
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: 'Ocurrió un error interno en el servidor.' });
	}
};

// --- ELIMINAR UN PERSONAJE ---
export const deleteCharacter = async (req, res) => {
	try {
		const { id } = req.params;
		const result = await Character.destroy({ where: { id: id } });

		if (result === 0) {
			return res.status(404).json({ message: 'Personaje no encontrado para eliminar.' });
		}
		res.sendStatus(204);
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: 'Ocurrió un error interno en el servidor.' });
	}
};
