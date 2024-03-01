import express from 'express';
import {
  createCategory,
  deleteCategory,
  getCategories,
  getCategory,
  updateCategory,
} from '../controllers/categoryControllers.js';
import { isLogged } from '../middelwares/isLogged.js';
import categoryUpload from '../config/categoryFileUpload.js';
import isAdmin from '../middelwares/isAdmin.js';

let categoryRouter = express.Router();

categoryRouter.post('/',isLogged, isAdmin, categoryUpload.single("image"), createCategory);
categoryRouter.get('/', getCategories);
categoryRouter.get('/:id', getCategory);
categoryRouter.put('/:id', isLogged, isAdmin, updateCategory);
categoryRouter.delete('/:id', isLogged, isAdmin, deleteCategory);

export default categoryRouter;