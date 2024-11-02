import { Schema, model } from "mongoose";
import { User } from "models/user";
import "../services/character-svc";
import { populate } from "dotenv";

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
    .populate("favoriteCharacters")
        .then((user) => { 
        if ( ! user) throw `${userid} Not Found`;
        return user
    });
}

function addFavoriteCharacter(userid: string, characterId: string): Promise<User> {
    return userModel.findByIdAndUpdate(
        userid,
        { $push: { favoriteCharacters: characterId } }, // Push characterId into favoriteCharacters array
        { new: true } // Return the updated user document
    ).populate("favoriteCharacters") // Optionally populate favorite characters if you want to return the updated list
    .then((user) => {
        if (!user) throw `${userid} Not Found`;
        return user;
    });
}

function deleteFavoriteCharacter(userid: string, characterId: string): Promise<User> {
    return userModel.findByIdAndUpdate(
        userid,
        { $pull: { favoriteCharacters: characterId } },
        { new: true }
    ).populate("favoriteCharacters")
    .then((user) => {
        if (!user) throw `${userid} Not Found`;
        return user;
    });
}
  
export default { index, get, addFavoriteCharacter, deleteFavoriteCharacter };
