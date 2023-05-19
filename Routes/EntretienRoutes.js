import express  from "express";

import { addEntretien, deleteEntretien, usersEntretiens } from "../Controllers/EntretienController.js";
import protect from "../Middlewares/autorization.js";
import multer from "../Middlewares/multer-config.js";

const router = express.Router()


router
  .route("/addEntretien")//////////////////
  .post(
    protect,
    addEntretien
    )
    
router
  .route("/deleteEntretien")//////////////////
  .delete(
    protect,
    deleteEntretien
    )

router
  .route("/userEntretiens")//////////////////
  .get(
   protect,
   usersEntretiens
   )


export default router;