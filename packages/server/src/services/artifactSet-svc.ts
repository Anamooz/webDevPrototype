import { Schema, model } from "mongoose";
import { ArtifactSet } from "models/artifactSet";

const artifactSetSchema = new Schema<ArtifactSet>(
    {
    img: { type: String, required: true },
    statType: { type: String, required: true }
    },
    { collection: "artifacts_collection" }
);

const artifactSetModel = model<ArtifactSet>("ArtifactSet", artifactSetSchema);