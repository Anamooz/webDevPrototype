import { User } from "server/models";

export type Msg =
  | [
      "profile/save",
      {
        username: string;
        profile: User;
        onSuccess?: () => void;
        onFailure?: (err: Error) => void;
      }
    ]
  | ["profile/select", { username: string }]
  | ["character/select", { name: string }]
  | ["character/add", { username: string; characterId: string }];
