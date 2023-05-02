import Car from "../Models/Car.js"
import User from "../Models/User.js";



export async function addCar(req , res){
    try {
        if(!req.user){
            return res.status(401).json({error: "You're not authenticated!"});
            }
        var { modele , marque, puissance, carburant, description, date_circulation, owned_by } = req.body;
        owned_by = req.user._id;
        var car = await Car.create({
            modele,
            marque,
            puissance,
            carburant,
            description,
            date_circulation,
            owned_by,
            image: `${req.file.filename}`
        });
       res.status(200).json({ message : "car added" });
      } catch (err) {
        res.status(500).json({ error: err });
      }
}


export async function userCars(req, res) {
    if(!req.user){
      return res.status('401').json({error: "You're not authenticated!"});
      }
    Car.find({owned_by: req.user._id})
    .then((cars) => {
      res.status(200).json({cars});
    })
    .catch(err => {
      res.status(500).json({ error: err })
    })
}

export async function carsForSale(req, res) {

    Car.find()
    .then((cars) => {
      res.status(200).json({cars});
    })
    .catch(err => {
      res.status(500).json({ error: err })
    })
}