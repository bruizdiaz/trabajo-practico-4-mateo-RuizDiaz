//------------------------------------//
//------------- IMPORT --------------//
//----------------------------------//
import express from 'express';
import { Character } from '../models/character.model.js';

export const getCharacters = async (req, res) => {
	try {
		const characters = await Character.findAll();
		res.json(characters);
	} catch (error) {
		console.log(error);
	}
};
export const getCharacterByID = async (req, res) => {};
export const createCharacter = async (req, res) => {};
export const updateCharacter = async (req, res) => {};
export const deleteCharacter = async (req, res) => {};
