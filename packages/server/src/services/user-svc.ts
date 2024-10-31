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

function get(userid: String): Promise<User> {
    return userModel.findById(userid)
        .then((user) => { 
        if ( ! user) throw `${userid} Not Found`;
        return user
    });
}
  
export default { index, get, Schema: userSchema };
