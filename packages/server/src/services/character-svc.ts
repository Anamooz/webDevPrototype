import { Schema, model } from "mongoose";
import { Character } from "models/character";
import "../services/weapon-svc";
import "../services/ascensionMaterials-svc";
import "../services/weaponMaterials-svc";
import "../services/artifactSet-svc";
import "../services/talentMaterials-svc";

const characterSchema = new Schema<Character>(
    {
    ascensionMaterials: [{ type: Schema.Types.ObjectId, ref: "AscensionMaterials" }],
    weapon: { type: Schema.Types.ObjectId, ref: "Weapon" },
    weaponMaterials: [{ type: Schema.Types.ObjectId, ref: "WeaponMaterials" }],
    artifactName: { type: String, required: true },
    artifactSet: [{ type: Schema.Types.ObjectId, ref: "ArtifactSet" }],
    artifactSubstats: { type: String, required: true },
    levelOrder: { type: String, required: true },
    talentMaterials: [{ type: Schema.Types.ObjectId, ref: "TalentMaterials" }] 
    },
    { collection: "characters_collection"}
);

const characterModel = model<Character>("Characters", characterSchema);

function index(): Promise<Character[]>{
    return characterModel.find();
}

export default { index };