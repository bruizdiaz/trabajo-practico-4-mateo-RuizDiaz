//------------------------------------//
//------------- IMPORT --------------//
//----------------------------------//
import { Router } from 'express';
import {
	getCharacterByID,
	createCharacter,
	deleteCharacter,
	getCharacters,
	updateCharacter,
} from '../controllers/character.controllers.js';

const router = Router();

router.get('/characters', getCharacters);
router.get('/characters/:id', getCharacterByID);
router.post('/characters', createCharacter);
router.put('/characters/:id', updateCharacter);
router.delete('/characters/:id', deleteCharacter);

export default router;
