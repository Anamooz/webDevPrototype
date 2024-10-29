import { Schema, model } from "mongoose";
import { AscensionMaterials } from "models/ascensionMaterials";

const ascensionMaterialsSchema = new Schema<AscensionMaterials>(
    {
    img: { type: String, required: true },
    quantity: { type: String, required: true },
    name: { type: String, required: true }
    },
    { collection: "materials_collection" }
);

const ascensionMaterialsModel = model<AscensionMaterials>("AscensionMaterials", ascensionMaterialsSchema);