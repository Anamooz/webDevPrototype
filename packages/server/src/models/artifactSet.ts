export interface ArtifactSet {
    img: string;
    statType: StatType;
}

export type StatType = 
    | "CRIT Rate" 
    | "CRIT DMG" 
    | "HP %" 
    | "DEF %" 
    | "ATK %"
    | "Energy Recharge" 
    | "Elemental Mastery"; 