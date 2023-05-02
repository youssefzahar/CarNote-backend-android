import express from "express";
import { addCar, userCars, carsForSale } from "../Controllers/CarController.js";
import protect from "../Middlewares/autorization.js";
import { get } from "mongoose";
import multer from "../Middlewares/multer-config.js";


const router = express.Router()


router
  .route("/addcar")//////////////////
  .post(
    protect,
    multer("image", 512 * 1024),
    addCar
    )


router
  .route("/userCars")//////////////////
  .get(
    protect,
    userCars
    )

router
    .route("/carsForSale")
    .get(
      carsForSale
    )



export default router;