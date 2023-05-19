import express  from "express";
const router = express.Router()
import { add, getAll, deleteAllComment } from "../Controllers/CommentController.js";
import protect from "../Middlewares/autorization.js";


router.route("/getAll/:idProduct").get(getAll);



      router
    .route("/add")
    .post(
      protect,
      add
      )

      router
    .route("/deleteAllComment")
    .delete(
      deleteAllComment
      )

      export default router;