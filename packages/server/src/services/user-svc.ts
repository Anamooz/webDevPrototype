import { Schema, model } from "mongoose";
import { User } from "models/user";
import "../services/character-svc";

const userSchema = new Schema<User>(
    {
    userid: { type: String, required: true },
    favoriteCharacters: [{ type: Schema.Types.ObjectId, ref: "Character"}]
    },
    { collection: "users_collection" }
);

const userModel = model<User>("User", userSchema);

function index(): Promise<User[]>{
    return userModel.find();
}

export default { Schema: userSchema };