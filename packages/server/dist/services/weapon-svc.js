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
var weapon_svc_exports = {};
__export(weapon_svc_exports, {
  default: () => weapon_svc_default
});
module.exports = __toCommonJS(weapon_svc_exports);
var import_mongoose = require("mongoose");
const weaponSchema = new import_mongoose.Schema(
  {
    weaponid: { type: String, required: true },
    img: { type: String, required: true },
    stat: { type: String, required: true },
    statType: { type: String, required: true },
    baseAttack: { type: Number, required: true },
    description: { type: String, required: true }
  },
  { collection: "weapon_collection" }
);
const weaponModel = (0, import_mongoose.model)("Weapon", weaponSchema);
function index() {
  return weaponModel.find();
}
function get(weaponid) {
  return weaponModel.find({ weaponid }).then((list) => list[0]).catch((err) => {
    throw `${weaponid} Not Found`;
  });
}
var weapon_svc_default = { index, get };
