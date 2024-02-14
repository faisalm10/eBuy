import express from 'express';
import {isLogged} from "../middelwares/isLogged.js"
import {
  createColor,
  deleteColor,
  getColor,
  getColors,
  updateColor,
} from '../controllers/colorControllers.js';


let colorRoutes = express.Router();

colorRoutes.post('/', isLogged, createColor);
colorRoutes.get('/', getColors);
colorRoutes.get('/:id', getColor);
colorRoutes.put('/:id', isLogged, updateColor);
colorRoutes.delete('/:id', isLogged, deleteColor);

export default colorRoutes;