import { Character } from "./character";

export interface User {
    userid: string;
    favoriteCharacters: Array<Character>;
    username: string;
}