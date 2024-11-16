import { Schema, model } from "mongoose";
import { User } from "models/user";
import { Credential } from "models/credential";
import "../services/character-svc";
import { populate } from "dotenv";
import { Types } from "mongoose";

const userSchema = new Schema<User>(
  {
    userid: { type: String },
    favoriteCharacters: [{ type: Schema.Types.ObjectId, ref: "Character" }],
    username: { type: String, required: true, unique: true },
  },
  { collection: "users_collection" }
);

const userModel = model<User>("User", userSchema);

function index(): Promise<User[]> {
  return userModel.find();
}

function get(userid: String): Promise<User> {
  return userModel
    .findById(userid)
    .populate("favoriteCharacters")
    .then((user) => {
      if (!user) throw `${userid} Not Found`;
      return user;
    });
}

function addFavoriteCharacterById(
  username: string,
  characterId: string
): Promise<User> {
  return userModel
    .findOne({ username })
    .then((user) => {
      if (!user) throw new Error(`User with username "${username}" not found`);

      // Ensure the characterId is a valid ObjectId
      if (!Types.ObjectId.isValid(characterId)) {
        throw new Error(`Invalid ObjectId: ${characterId}`);
      }

      // Add the characterId to favoriteCharacters if it doesn't already exist
      const favoriteCharactersSet = new Set(
        user.favoriteCharacters.map((id) => id.toString())
      );
      favoriteCharactersSet.add(characterId);

      // Convert back to an array of ObjectIds
      user.favoriteCharacters = Array.from(favoriteCharactersSet).map(
        (id) => new Types.ObjectId(id)
      );

      return user.save();
    })
    .then((updatedUser) => updatedUser.populate("favoriteCharacters"))
    .catch((err) => {
      console.error(`Failed to add favorite character: ${err.message}`);
      throw new Error(`Failed to add favorite character: ${err.message}`);
    });
}

function getByUsername(username: string): Promise<User> {
  return userModel
    .findOne({ username })
    .populate("favoriteCharacters")
    .then((user) => {
      if (!user) {
        console.log(`User with username ${username} not found in the database`); // Log if user is not found
        throw new Error(`User with username ${username} not found`);
      }
      return user;
    });
}

function addFavoriteCharacter(
  userid: string,
  characterId: string
): Promise<User> {
  return userModel
    .findByIdAndUpdate(
      userid,
      { $push: { favoriteCharacters: characterId } }, // Push characterId into favoriteCharacters array
      { new: true } // Return the updated user document
    )
    .populate("favoriteCharacters") // Optionally populate favorite characters if you want to return the updated list
    .then((user) => {
      if (!user) throw `${userid} Not Found`;
      return user;
    });
}

function deleteFavoriteCharacter(
  userid: string,
  characterId: string
): Promise<User> {
  return userModel
    .findByIdAndUpdate(
      userid,
      { $pull: { favoriteCharacters: characterId } },
      { new: true }
    )
    .populate("favoriteCharacters")
    .then((user) => {
      if (!user) throw `${userid} Not Found`;
      return user;
    });
}

export default {
  index,
  get,
  addFavoriteCharacterById,
  getByUsername,
  addFavoriteCharacter,
  deleteFavoriteCharacter,
};
