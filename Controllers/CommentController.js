import Comment from "../Models/Comment.js"
import User from "../Models/User.js";
import Product from "../Models/Product.js";

export async function getAll(req, res) {
    var idProduct = req.params.idProduct;
  
    Comment.find({ idProduct: idProduct })
      .then((comments) => {
        res.status(200).json({ comments });
      })
      .catch((err) => {
        res.status(500).json({ error: err });
      });
  }
  

  export async function add(req, res) {
    try {
      if (!req.user) {
        return res.status(401).json({ error: "You're not authenticated!" });
      }
  
      var { description, idUser, idProduct, userimage, username } = req.body;
      idUser = req.user._id;
      const fulluser = await User.findById(req.user._id);
      userimage = fulluser.image;
      username = fulluser.username;
  
      await Comment.create({
        idProduct,
        idUser,
        description,
        userimage,
        username,
      });
  
      res.status(200).json({ message: "comment added" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
  

export async function deleteAllComment (req, res)  {
    Comment.remove({}, function (err) {
        if (err) {
            return handleError(res, err)
        }
        return res.status(204).send({ message: "Aucun element" })
    })
}