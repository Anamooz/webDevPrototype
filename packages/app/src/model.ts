import { User, Character } from "server/models";

export interface Model {
  profile?: User;
  character?: Character;
}

export const init: Model = {};