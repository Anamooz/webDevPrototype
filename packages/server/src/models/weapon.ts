export interface Weapon {
    img: string;
    stat: string;
    statType: WeaponStatType;
    baseAttack: number;
    description: string;
}

export type WeaponStatType = 
    | "CRIT Rate" 
    | "CRIT DMG" 
    | "HP" 
    | "DEF" 
    | "Energy Recharge" 
    | "Elemental Mastery";