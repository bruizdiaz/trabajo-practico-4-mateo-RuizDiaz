//------------------------------------//
//------------- IMPORT --------------//
//----------------------------------//
import express from 'express';
import Character from '../models/character.model.js';
import { channel } from 'diagnostics_channel';
import { type } from 'os';

export const getCharacters = async (req, res) => {
	try {
		const characters = await Character.findAll({
			attributes: { exclude: ['id', 'createdAt', 'updatedAt'] },
		});
		res.json(characters);
	} catch (error) {
		console.log(error);
	}
};
export const getCharacterByID = async (req, res) => {
	try {
		const id = req.params.id;
		const character = await Character.findByPk(id);
		if (!character) {
			return res.status(404).json({ message: 'Personaje no encontrado' });
		}
		req.character = character;
		res.status(200).json({
			Message: 'Character founded',
			Name: character.name,
			Race: character.race,
			Description: character.description,
			Ki: character.ki,
			Id: character.id,
		});
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

export const createCharacter = async (req, res) => {
	try {
		//Desestructuracion de la request
		let { name, ki, race, gender, description } = req.body;
		const errors = []; //Array para pushear diferentes errores
		if (!name || name === '' || typeof name !== 'string')
			errors.push({
				message: 'Peticion Invalida. El nombre debe ser un string.',
			});

		if (!ki || ki === '' || typeof ki !== 'number')
			errors.push({
				message: 'Peticion Invalida. El Ki debe ser un numero.',
			});
		if (typeof ki === 'number' && ki % 1 !== 0) {
			ki = Math.trunc(ki);
		}
		if (!race || race === '' || typeof race !== 'string')
			errors.push({
				message: 'Peticion Invalida. La raza debe ser un string.',
			});

		if (!gender || gender === '' || typeof gender !== 'string')
			errors.push({
				message: 'Peticion Invalida. El genero debe ser un string.',
			});

		if (description === null) {
			description = '';
		}

		const existingCharacter = await Character.findOne({ where: { name: name } });
		if (existingCharacter)
			errors.push({
				message: 'Ya existe un personaje con ese nombre',
			});

		if (errors.length > 0) return res.status(400).json({ errors });

		const capitalize = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
		const newCharacter = {
			name: capitalize,
			ki: ki,
			race: race,
			gender: gender,
			description: description,
		};

		const character = await Character.create(newCharacter);

		res.status(201).json({
			message: 'Character created succesfully',
			name: character.name,
			race: character.race,
			gender: character.gender,
			description: character.description,
			ki: character.ki,
			id: character.id,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json(error);
	}
};

export const updateCharacter = async (req, res) => {};
export const deleteCharacter = async (req, res) => {};
