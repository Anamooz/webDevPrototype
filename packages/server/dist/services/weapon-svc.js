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
var weapon_svc_exports = {};
__export(weapon_svc_exports, {
  getWeapon: () => getWeapon
});
module.exports = __toCommonJS(weapon_svc_exports);
const weapons = {
  jadefallSplendor: {
    img: "/images/weapons/jadefallSplendor.png",
    stat: "49.6 %",
    statType: "HP",
    baseAttack: 608,
    description: "Primordial Jade Regalia, for 3s after using an Elemental Burst or creating a shield, the equipping character can gain the Primordial Jade Regalia effect: Restore 4.5 Energy every 2.5s, and gain 0.3% Elemental DMG Bonus for their corresponding Elemental Type for every 1,000 Max HP they possess, up to 12%. Primordial Jade Regalia will still take effect even if the equipping character is not on the field."
  }
};
function getWeapon(_) {
  return weapons["jadefallSplendor"];
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getWeapon
});
