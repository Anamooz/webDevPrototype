import { Auth, Update } from "@calpoly/mustang";
import { Msg } from "./messages";
import { Model } from "./model";
import { Character, User } from "server/models";

export default function update(
  message: Msg,
  apply: Update.ApplyMap<Model>,
  user: Auth.User
) {
  switch (message[0]) {
    case "profile/select":
      selectProfile(message[1], user).then((profile) =>
        apply((model) => ({ ...model, profile }))
      );
      break;
    case "character/select":
      selectCharacter(message[1], user).then(
        (character: Character | undefined) =>
          apply((model) => ({
            ...model,
            character, // Update the character property in the model
          }))
      );
      break;

      case "favorite/add":
  addFavoriteCharacter(message[1], user).then((updatedUser) =>
    apply((model) => ({ ...model, profile: updatedUser }))
  );
  break;

    default:
      const unhandled: never = message[0];
      throw new Error(`Unhandled Auth message "${unhandled}"`);
  }
}

function selectProfile(msg: { username: string }, user: Auth.User) {
  return fetch(`/api/users/${msg.username}`, {
    headers: Auth.headers(user),
  })
    .then((response: Response) => {
      if (response.status === 200) {
        return response.json();
      }
      return undefined;
    })
    .then((json: unknown) => {
      if (json) {
        console.log("Profile:", json);
        return json as User;
      }
    });
}

function selectCharacter(msg: { name: string }, user: Auth.User) {
  return fetch(`/api/characters/${msg.name}`, {
    headers: Auth.headers(user),
  })
    .then((response: Response) => {
      if (response.status === 200) {
        return response.json();
      }
      return undefined;
    })
    .then((json: unknown) => {
      if (json) {
        console.log("Character:", json);
        return json as Character;
      }
    });
}

function addFavoriteCharacter(
  msg: { username: string; characterId: string },
  user: Auth.User
) {
  return fetch(
    `/api/users/${msg.username}/favoriteCharacters/${msg.characterId}`,
    {
      method: "PUT",
      headers: Auth.headers(user),
    }
  )
    .then((response: Response) => {
      if (response.status === 200) {
        return response.json(); // Return the updated user object
      }
      throw new Error(
        `Failed to add favorite character: ${response.statusText}`
      );
    })
    .then((json: unknown) => (json ? (json as User) : undefined));
}
