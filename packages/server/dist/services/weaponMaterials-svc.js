"use strict";
var import_mongoose = require("mongoose");
const weaponMaterialsSchema = new import_mongoose.Schema(
  {
    img: { type: String, required: true },
    quantity: { type: String, required: true },
    name: { type: String, required: true }
  },
  { collection: "materials_collection" }
);
const WeaponMaterialsModel = (0, import_mongoose.model)("WeaponMaterials", weaponMaterialsSchema);
