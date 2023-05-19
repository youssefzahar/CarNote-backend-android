import express  from "express";

import { signin, getuser, signup, updateUser, verifyAccount, sendOTP,resetPassword, verifyOTP,desactivateUser, activateUser, sendactivationmail, userimage } from "../Controllers/UserController.js";
import protect from "../Middlewares/autorization.js";
import multer from "../Middlewares/multer-config.js";

const router = express.Router()

router
.route("/signin")///////////////////////////////////////////////////
.post(signin)

router
  .route("/verify-account")
  .get(verifyAccount)
  
router
  .route("/profile")///////////////////////////////////
  .get(
    protect,
    getuser
    )

router
  .route("/signup")////////////////////////////////////////////////////
  .post(
   // multer("image", 512 * 1024),
    signup)

router
 .route("/update")
 .put(
  protect,
  updateUser
  );

router
  .route("/otpsend")///////////////////////////////////////////////////////////////
  .post(
    sendOTP
    )

router
 .route("/resetPassword")///////////////////////////////////////////////////////
 .put(
  resetPassword
  );

router
  .route("/verifyOTP")//////////////////////////////////////////////////////////
  .post(
    verifyOTP
  );

router
  .route("/desactivateUser")
  .put(
    protect,
    desactivateUser
  );

router
  .route("/activateUser")
  .get(
    activateUser
  );

router
  .route("/sendactivationmail")
  .put(
    sendactivationmail
  );

router
  .route("/userimage")///////////////////
  .post(
    protect,
    multer("image", 512 * 1024),
    userimage
  );
    

export default router;