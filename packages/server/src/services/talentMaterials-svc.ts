import { Schema, model } from "mongoose";
import { TalentMaterials } from "models/talentMaterials";

const talentMaterialsSchema = new Schema<TalentMaterials>(
    {
    img: { type: String, required: true },
    quantity: { type: String, required: true },
    name: { type: String, required: true }
    },
    { collection: "materials_collection" }
);

const talentMaterialsModel = model<TalentMaterials>("talentMaterials", talentMaterialsSchema);