import express  from "express";

import { addProduct, updateProduct, deleteProduct, usersProducts, getAllProducts } from "../Controllers/ProductController.js";
import protect from "../Middlewares/autorization.js";
import multer from "../Middlewares/multer-config.js";

const router = express.Router()


router
  .route("/addProduct")//////////////////
  .post(
    multer("image", 512 * 1024),
    protect,
    addProduct
    )
    
router
  .route("/updateProduct")//////////////////
  .put(
  //  multer("image", 512 * 1024),
  protect,
    updateProduct
    )

router
  .route("/deleteProduct")//////////////////
  .post(
    protect,
   deleteProduct
   )

router
  .route("/usersProducts")//////////////////
  .get(
    protect,
   usersProducts
   )


   router
   .route("/getAllProducts")//////////////////
   .get(
    getAllProducts
    )
   

export default router;