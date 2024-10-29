import { Weapon } from "./weapon";
import { AscensionMaterials } from "./ascensionMaterials";
import { WeaponMaterials } from "./weaponMaterials";
import { ArtifactSet } from "./artifactSet";
import { TalentMaterials } from "./talentMaterials";

export interface Character {
    name: string;
    ascensionMaterials: Array<AscensionMaterials>;
    weapon: Weapon;
    weaponMaterials: Array<WeaponMaterials>;
    artifactName: string;
    artifactSet: Array<ArtifactSet>;
    artifactSubstats: string;
    levelOrder: string;
    talentMaterials: Array<TalentMaterials>;
}