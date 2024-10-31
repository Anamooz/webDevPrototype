"use strict";
var import_mongoose = require("mongoose");
const artifactSetSchema = new import_mongoose.Schema(
  {
    img: { type: String, required: true },
    statType: { type: String, required: true }
  },
  { collection: "artifacts_collection" }
);
const artifactSetModel = (0, import_mongoose.model)("ArtifactSet", artifactSetSchema);
