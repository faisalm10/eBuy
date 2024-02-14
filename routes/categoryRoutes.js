import express from 'express';
import {
  createCategory,
  deleteCategory,
  getCategories,
  getCategory,
  updateCategory,
} from '../controllers/categoryControllers.js';
import { isLogged } from '../middelwares/isLogged.js';

let categoryRouter = express.Router();

categoryRouter.post('/',isLogged,createCategory);
categoryRouter.get('/', getCategories);
categoryRouter.get('/:id', getCategory);
categoryRouter.put('/:id', isLogged, updateCategory);
categoryRouter.delete('/:id', isLogged, deleteCategory);

export default categoryRouter;