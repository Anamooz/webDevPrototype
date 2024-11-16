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
var user_svc_exports = {};
__export(user_svc_exports, {
  default: () => user_svc_default
});
module.exports = __toCommonJS(user_svc_exports);
var import_mongoose = require("mongoose");
var import_character_svc = require("../services/character-svc");
var import_mongoose2 = require("mongoose");
const userSchema = new import_mongoose.Schema(
  {
    userid: { type: String },
    favoriteCharacters: [{ type: import_mongoose.Schema.Types.ObjectId, ref: "Character" }],
    username: { type: String, required: true, unique: true }
  },
  { collection: "users_collection" }
);
const userModel = (0, import_mongoose.model)("User", userSchema);
function index() {
  return userModel.find();
}
function get(userid) {
  return userModel.findById(userid).populate("favoriteCharacters").then((user) => {
    if (!user) throw `${userid} Not Found`;
    return user;
  });
}
function addFavoriteCharacterById(username, characterId) {
  return userModel.findOne({ username }).then((user) => {
    if (!user) throw new Error(`User with username "${username}" not found`);
    if (!import_mongoose2.Types.ObjectId.isValid(characterId)) {
      throw new Error(`Invalid ObjectId: ${characterId}`);
    }
    const favoriteCharactersSet = new Set(
      user.favoriteCharacters.map((id) => id.toString())
    );
    favoriteCharactersSet.add(characterId);
    user.favoriteCharacters = Array.from(favoriteCharactersSet).map(
      (id) => new import_mongoose2.Types.ObjectId(id)
    );
    return user.save();
  }).then((updatedUser) => updatedUser.populate("favoriteCharacters")).catch((err) => {
    console.error(`Failed to add favorite character: ${err.message}`);
    throw new Error(`Failed to add favorite character: ${err.message}`);
  });
}
function getByUsername(username) {
  return userModel.findOne({ username }).populate("favoriteCharacters").then((user) => {
    if (!user) {
      console.log(`User with username ${username} not found in the database`);
      throw new Error(`User with username ${username} not found`);
    }
    return user;
  });
}
function addFavoriteCharacter(userid, characterId) {
  return userModel.findByIdAndUpdate(
    userid,
    { $push: { favoriteCharacters: characterId } },
    // Push characterId into favoriteCharacters array
    { new: true }
    // Return the updated user document
  ).populate("favoriteCharacters").then((user) => {
    if (!user) throw `${userid} Not Found`;
    return user;
  });
}
function deleteFavoriteCharacter(userid, characterId) {
  return userModel.findByIdAndUpdate(
    userid,
    { $pull: { favoriteCharacters: characterId } },
    { new: true }
  ).populate("favoriteCharacters").then((user) => {
    if (!user) throw `${userid} Not Found`;
    return user;
  });
}
var user_svc_default = {
  index,
  get,
  addFavoriteCharacterById,
  getByUsername,
  addFavoriteCharacter,
  deleteFavoriteCharacter
};
