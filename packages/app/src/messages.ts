import { User } from "server/models";

export type Msg =
  | ["profile/save", { username: string; profile: User }]
  | ["profile/select", { username: string }]
  | ["character/select", { name: string }];