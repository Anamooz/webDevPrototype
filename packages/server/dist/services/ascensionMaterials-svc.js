"use strict";
var import_mongoose = require("mongoose");
const ascensionMaterialsSchema = new import_mongoose.Schema(
  {
    img: { type: String, required: true },
    quantity: { type: String, required: true },
    name: { type: String, required: true }
  },
  { collection: "materials_collection" }
);
const ascensionMaterialsModel = (0, import_mongoose.model)("AscensionMaterials", ascensionMaterialsSchema);
