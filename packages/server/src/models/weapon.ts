export interface Weapon {
    img: string;
    stat: string;
    statType: string;
    baseAttack: number;
    description: string;
}

export type weaponStatType = | "CRIT Rate" | "CRIT DMG" | "HP" | "DEF" | "Energy Recharge" | "Elemental Mastery";