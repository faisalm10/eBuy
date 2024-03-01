import express from 'express';
import {isLogged} from "../middelwares/isLogged.js"
import {
  createColor,
  deleteColor,
  getColor,
  getColors,
  updateColor,
} from '../controllers/colorControllers.js';
import isAdmin from '../middelwares/isAdmin.js';


let colorRoutes = express.Router();

colorRoutes.post('/', isLogged, isAdmin, createColor);
colorRoutes.get('/', getColors);
colorRoutes.get('/:id', getColor);
colorRoutes.put('/:id', isLogged, isAdmin, updateColor);
colorRoutes.delete('/:id', isLogged,isAdmin, deleteColor);

export default colorRoutes;