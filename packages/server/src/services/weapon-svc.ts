import { Weapon, WeaponStatType } from "../models";

const weapons = {
    jadefallSplendor: {
    img: "/images/weapons/jadefallSplendor.png",
    stat: "49.6 %",
    statType: "HP" as WeaponStatType,
    baseAttack: 608,
    description: "Primordial Jade Regalia, for 3s after using an Elemental Burst or creating a shield, the equipping character can gain the Primordial Jade Regalia effect: Restore 4.5 Energy every 2.5s, and gain 0.3% Elemental DMG Bonus for their corresponding Elemental Type for every 1,000 Max HP they possess, up to 12%. Primordial Jade Regalia will still take effect even if the equipping character is not on the field."
    }
};

export function getWeapon(_: string) {
    return weapons["jadefallSplendor"];
}