import dotenv from "dotenv";
dotenv.config();
import express from "express";
import { dbConnection } from "../config/dbConfig.js";
import userRouter from "../routes/userRoutes.js";
import productRouter from "../routes/productRoutes.js";
import { globalErrorHandler } from "../middelwares/globalErrorHandler.js";
import categoryRouter from "../routes/categoryRoutes.js";
import brandRouter from "../routes/brandRoutes.js";
import colorRoutes from "../routes/colorRoutes.js";
import reviewRouter from "../routes/reviewRoutes.js";
import orderRouter from "../routes/orderRoutes.js";
import Stripe from "stripe";
import couponRoutes from "../routes/CouponRoutes.js";
import Order from '../models/Order.js'; 
import cors from "cors"

// database config
dbConnection();

// app instance
let app = express();

// applying cors
app.use(cors())



// stripe webHook
const stripe = new Stripe(process.env.STRIPE_KEY);

// This is your Stripe CLI webhook secret for testing your endpoint locally.
const endpointSecret =
  "whsec_260c47063f2a40c3e91f79fde3c3af62fcba26e972aa02ea31208f5716b2f44f";

app.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  async (request, response) => {
    const sig = request.headers["stripe-signature"];

    let event;

    try {
      event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
    } catch (err) {
      response.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }

    // // Handle the event
    // switch (event.type) {
    //   case "payment_intent.succeeded":
    //     const paymentIntentSucceeded = event.data.object;
    //     // Then define and call a function to handle the event payment_intent.succeeded
    //     break;
    //   // ... handle other event types
    //   default:
    //     console.logexport(`Unhandled event type ${event.type}`);
    // }

    if (event.type === 'checkout.session.completed') {
      const session=event.data.object
      const currency=session.currency
      const paymentMethod=session.payment_method_types[0]
      const paymentStatus = session.payment_status;
      const totalPrice=session.amount_total
      const orderId=session.metadata.orderId
      await Order.findByIdAndUpdate(
        JSON.parse(orderId),
        {
          currency, 
          paymentMethod,
          paymentStatus,
          totalPrice:totalPrice / 100,
        },
        
        {new:true}
      )

      // console.log(currency,paymentMethod,paymentStatus,totalPrice,orderId);
    }else{
      return
    }


    // Return a 200 response to acknowledge receipt of the event
    response.send();
  }
);

// middleware to process incoming json data
app.use(express.json());

// using router instance
app.use("/api/v1/users", userRouter);
app.use("/api/v1/products", productRouter);
app.use("/api/v1/categories", categoryRouter);
app.use("/api/v1/brand", brandRouter);
app.use("/api/v1/colors", colorRoutes);
app.use("/api/v1/reviews", reviewRouter);
app.use("/api/v1/orders", orderRouter);
app.use("/api/v1/coupons", couponRoutes);
// not found route
app.all("*", (req, res, next) => {
  const err = new Error(`path ${req.originalUrl} is not found`);
  err.status = 404;
  next(err);
});

// error handling middleware
app.use(globalErrorHandler);

export default app;
