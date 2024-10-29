import { Schema, model } from "mongoose";
import { WeaponMaterials } from "models/weaponMaterials";

const weaponMaterialsSchema = new Schema<WeaponMaterials>(
    {
    img: { type: String, required: true },
    quantity: { type: String, required: true },
    name: { type: String, required: true }
    },
    { collection: "materials_collection" }
);

const WeaponMaterialsModel = model<WeaponMaterials>("WeaponMaterials", weaponMaterialsSchema);