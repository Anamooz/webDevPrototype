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
    { collection: "weapon_collection"}
);

const weaponModel = model<Weapon>("Weapon", weaponSchema);

function index(): Promise<Weapon[]>{
    return weaponModel.find();
}

function get(weaponid: String): Promise<Weapon> {
    return weaponModel.find({ weaponid })
      .then((list) => list[0])
      .catch((err) => {
        throw `${weaponid} Not Found`;
      });
  }
  
  export default { index, get };
