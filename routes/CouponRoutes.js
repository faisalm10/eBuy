import express from 'express';
import {isLogged} from "../middelwares/isLogged.js"
import { createCoupon, deleteCoupon, getCoupon, getCoupons, updateCoupon,  } from '../controllers/couponControllers.js';
import isAdmin from '../middelwares/isAdmin.js';



let couponRoutes = express.Router();

couponRoutes.post('/', isLogged,isAdmin, createCoupon);
couponRoutes.get('/', getCoupons);
couponRoutes.get('/:id', getCoupon);
couponRoutes.put('/:id', isLogged,isAdmin, updateCoupon);
couponRoutes.delete('/:id', isLogged, isAdmin, deleteCoupon);

export default couponRoutes;