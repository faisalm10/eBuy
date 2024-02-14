import express from "express";
import {
  deleteReviewOfPorduct,
  getReviewsOfProduct,
  postReview,
} from "../controllers/reviewControllers.js";
import { isLogged } from "../middelwares/isLogged.js";

const reviewRouter = express.Router();

reviewRouter.post("/:productId", isLogged, postReview);
reviewRouter.get("/:productId",isLogged, getReviewsOfProduct);
reviewRouter.delete("/:reviewId",isLogged, deleteReviewOfPorduct);


export default reviewRouter;
