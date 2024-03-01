import express from "express";
import {isLogged} from "../middelwares/isLogged.js"

import {
  createBrand,
  deleteBrand,
  getBrand,
  getBrands,
  updateBrand,
} from "../controllers/brandControllers.js";
import isAdmin from "../middelwares/isAdmin.js";

let brandRouter = express.Router();

brandRouter.post("/", isLogged, isAdmin, createBrand);
brandRouter.get("/", getBrands);
brandRouter.get("/:id", getBrand);
brandRouter.put("/:id", isLogged, isAdmin, updateBrand);
brandRouter.delete("/:id", isLogged, isAdmin, deleteBrand);

export default brandRouter;