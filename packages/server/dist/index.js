"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var import_express = __toESM(require("express"));
var import_weapon = require("./pages/weapon");
var import_user = require("./pages/user");
var import_weapon_svc = __toESM(require("./services/weapon-svc"));
var import_user_svc = __toESM(require("./services/user-svc"));
var import_mongo = require("./services/mongo");
var import_users = __toESM(require("./routes/users"));
var import_auth = __toESM(require("./routes/auth"));
var import_auth2 = require("./pages/auth");
var import_auth3 = require("./pages/auth");
var import_characters = __toESM(require("./routes/characters"));
const app = (0, import_express.default)();
const port = process.env.PORT || 3e3;
const staticDir = process.env.STATIC || "public";
app.use(import_express.default.static(staticDir));
app.use(import_express.default.json());
app.use("/auth", import_auth.default);
app.use("/api/users", import_users.default);
app.use("/api/characters", import_characters.default);
(0, import_mongo.connect)("test");
app.get("/hello", (req, res) => {
  res.send("Hello, World");
});
app.get("/login", (req, res) => {
  const page = new import_auth2.LoginPage();
  res.set("Content-Type", "text/html").send(page.render());
});
app.get("/register", (req, res) => {
  const page = new import_auth3.RegistrationPage();
  res.set("Content-Type", "text/html").send(page.render());
});
app.get("/weapon/:weaponid", (req, res) => {
  const { weaponid } = req.params;
  import_weapon_svc.default.get(weaponid).then((data) => {
    const page = new import_weapon.WeaponPage(data);
    res.set("Content-Type", "text/html").send(page.render());
  });
});
app.get("/user/:username", (req, res) => {
  const { username } = req.params;
  import_user_svc.default.getByUsername(username).then((user) => {
    const page = new import_user.UserPage(user);
    res.set("Content-Type", "text/html").send(page.render());
  }).catch((error) => {
    res.status(404).send(`User with username ${username} not found`);
  });
});
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
