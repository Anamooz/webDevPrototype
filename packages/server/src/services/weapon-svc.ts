import { Schema, model } from "mongoose";
import { Weapon } from "../models";

const weaponSchema = new Schema<Weapon>(
    {
    weaponid: { type: String, required: true },
    img: { type: String, required: true },
    stat: { type: String, required: true },
    statType: { type: String, required: true },
    baseAttack: {type: Number, required: true },
    description: { type: String, required: true }
    },
    { collection: "weapons_collection"}
);

const weaponModel = model<Weapon>("Weapon", weaponSchema);

function index(): Promise<Weapon[]>{
    return weaponModel.find();
}

function get(weaponid: String): Promise<Weapon> {
    return weaponModel.findById(weaponid)
      .then((weapon) => { 
        if ( ! weapon) throw `${weaponid} Not Found`;
        return weapon
      });
  }
  
  export default { index, get };
