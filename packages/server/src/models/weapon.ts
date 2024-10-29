export interface Weapon {
    weaponid: string;
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
    | "ATK"
    | "Energy Recharge" 
    | "Elemental Mastery"; 