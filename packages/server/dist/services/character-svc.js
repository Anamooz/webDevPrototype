"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var character_svc_exports = {};
__export(character_svc_exports, {
  default: () => character_svc_default
});
module.exports = __toCommonJS(character_svc_exports);
var import_mongoose = require("mongoose");
var import_weapon_svc = require("../services/weapon-svc");
var import_ascensionMaterials_svc = require("../services/ascensionMaterials-svc");
var import_weaponMaterials_svc = require("../services/weaponMaterials-svc");
var import_artifactSet_svc = require("../services/artifactSet-svc");
var import_talentMaterials_svc = require("../services/talentMaterials-svc");
const characterSchema = new import_mongoose.Schema(
  {
    ascensionMaterials: [{ type: import_mongoose.Schema.Types.ObjectId, ref: "AscensionMaterials" }],
    weapon: { type: import_mongoose.Schema.Types.ObjectId, ref: "Weapon" },
    weaponMaterials: [{ type: import_mongoose.Schema.Types.ObjectId, ref: "WeaponMaterials" }],
    artifactName: { type: String, required: true },
    artifactSet: [{ type: import_mongoose.Schema.Types.ObjectId, ref: "ArtifactSet" }],
    artifactSubstats: { type: String, required: true },
    levelOrder: { type: String, required: true },
    talentMaterials: [{ type: import_mongoose.Schema.Types.ObjectId, ref: "TalentMaterials" }]
  },
  { collection: "characters_collection" }
);
const characterModel = (0, import_mongoose.model)("Character", characterSchema);
function index() {
  return characterModel.find();
}
function get(characterid) {
  return characterModel.findById(characterid).then((character) => {
    if (!character) throw `${characterid} Not Found`;
    return character;
  });
}
function getByName(characterName) {
  return characterModel.findOne({ name: characterName }).exec();
}
var character_svc_default = { index, getByName };
