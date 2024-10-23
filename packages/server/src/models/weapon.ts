export interface Weapon {
    img: string;
    name: string;
    stat: number;
    statType: weaponStatType;
    description: string;
}

export type weaponStatType = "CRIT Rate" | "CRIT DMG" | "HP" | "DEF" | "Energy Recharge" | "Elemental Mastery";