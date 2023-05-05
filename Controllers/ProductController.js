import Product from "../Models/Product.js"
import User from "../Models/User.js";

export async function addProduct(req , res){
    try {
        if(!req.user){
            return res.status(401).json({error: "You're not authenticated!"});
            }
        var { title , stock, prix, description, owned_by } = req.body;
        owned_by = req.user._id;
        var exists = await Product.findOne({title});
        if (exists) {
            return res.status(403).json({error: "product exists !"});
          }
        var product = await Product.create({
            title,
            stock,
            prix,
            owned_by,
            description,
           // image: `${req.protocol}://${req.get("host")}/img/${req.file.filename}`
        });
    
       res.status(200).json({ message : "product added" });
      } catch (err) {
        res.status(500).json({ error: err });
      }
}

export async function updateProduct(req, res) {

  var _id = req.body._id
    let newProduct = {};
    newProduct = {
        stock: req.body.stock,
        prix: req.body.prix,
        description: req.body.description,
      //  image: `${req.protocol}://${req.get("host")}/img/${req.file.filename}`,
      }
    Product.findByIdAndUpdate(_id, newProduct)
    .then(() => {
      res.status(200).json({ message:"product modified" });
    })
    .catch(err => {
      res.status(500).json({ error: err })
    })
}


export async function deleteProduct(req, res) {

    var _id = req.body._id
    Product.findByIdAndDelete(_id)
    .then(() => {
      res.status(200).json({ message:"product deleted" });
    })
    .catch(err => {
      res.status(500).json({ error: err })
    })
}


export async function usersProducts(req, res) {
    if(!req.user){
      return res.status('401').json({error: "You're not authenticated!"});
      }
    Product.find({owned_by: req.user._id})
    .then((products) => {
      res.status(200).json({products});
    })
    .catch(err => {
      res.status(500).json({ error: err })
    })
}

export async function getAllProducts(req, res) {

  Product.find()
  .then((products) => {
    res.status(200).json({products});
  })
  .catch(err => {
    res.status(500).json({ error: err })
  })
}