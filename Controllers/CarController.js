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


export async function updatecar(req, res) {
  try {

    if(!req.user){
      return res.status(401).json({error: "You're not authenticated!"});
      }
      var _id=req.body._id;
      const car = await Car.findById(_id);
    if(req.user != car.owned_by){
      return res.status(402).json({error: "You're not Allowed!"});
      }

      var description=req.body.description;
      var date_circulation=req.body.date_circulation;
      car.description=description;
      car.date_circulation=date_circulation;
      car.save();
      res.status(200).json( {message : "car updated" })
    } catch (error) {
    console.log(error);
  }
}


export async function deleteCar(req, res) {
  if(!req.user){
    return res.status(401).json({error: "You're not authenticated!"});
    }
    
  var _id = req.body._id
  const car = await Car.findById(_id);
  if(req.user != car.owned_by){
    return res.status(402).json({error: "You're not Allowed!"});
    }
  Car.findByIdAndDelete(_id)
  .then(() => {
    res.status(200).json({ message:"car deleted" });
  })
  .catch(err => {
    res.status(500).json({ error: err })
  })
}
