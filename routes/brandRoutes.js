import express from "express";
import {isLogged} from "../middelwares/isLogged.js"

import {
  createBrand,
  deleteBrand,
  getBrand,
  getBrands,
  updateBrand,
} from "../controllers/brandControllers.js";

let brandRouter = express.Router();

brandRouter.post("/", isLogged, createBrand);
brandRouter.get("/", getBrands);
brandRouter.get("/:id", getBrand);
brandRouter.put("/:id", isLogged, updateBrand);
brandRouter.delete("/:id", isLogged, deleteBrand);

export default brandRouter;