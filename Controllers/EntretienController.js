import Entretien from "../Models/Entretien.js"
import User from "../Models/User.js";

export async function addEntretien(req , res){
    try {
        if(!req.user){
            return res.status(401).json({error: "You're not authenticated!"});
            }
        var { title , date, description, owned_by } = req.body;
        owned_by = req.user._id;
        
        var entretien = await Entretien.create({
            title,
            date,
            owned_by,
            description,
        });
    
       res.status(200).json({ message : "entretien added" });
      } catch (err) {
        res.status(500).json({ error: err });
      }
}

export async function deleteEntretien(req, res) {

    var entretienID = req.body.entretienID
    Entretien.findByIdAndDelete(entretienID)
    .then(() => {
      res.status(200).json({ message:"entretien deleted" });
    })
    .catch(err => {
      res.status(500).json({ error: err })
    })
}


export async function usersEntretiens(req, res) {
    if(!req.user){
      return res.status('401').json({error: "You're not authenticated!"});
      }
    Entretien.find({owned_by: req.user._id})
    .then((entretien) => {
      res.status(200).json({entretien});
    })
    .catch(err => {
      res.status(500).json({ error: err })
    })
}