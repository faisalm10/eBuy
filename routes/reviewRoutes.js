import express from "express";
import {
  deleteReviewOfPorduct,
  getReviewsOfProduct,
  postReview,
} from "../controllers/reviewControllers.js";
import { isLogged } from "../middelwares/isLogged.js";
import isAdmin from "../middelwares/isAdmin.js";

const reviewRouter = express.Router();

reviewRouter.post("/:productId", isLogged, postReview);
reviewRouter.get("/:productId",isLogged, getReviewsOfProduct);
reviewRouter.delete("/:reviewId",isLogged, isAdmin, deleteReviewOfPorduct);


export default reviewRouter;
