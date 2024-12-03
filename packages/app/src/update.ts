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
    case "profile/save":
      saveProfile(message[1], user)
        .then((profile) => apply((model) => ({ ...model, profile })))
        .then(() => {
          const { onSuccess } = message[1];
          if (onSuccess) onSuccess();
        })
        .catch((error: Error) => {
          const { onFailure } = message[1];
          if (onFailure) onFailure(error);
        });
      break;
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
        addFavoriteCharacter(message[1], user)
          .then((updatedUser) => {
            apply((model) => ({ ...model, profile: updatedUser }));
      
            // Call onSuccess if provided
            if (message[1].onSuccess) message[1].onSuccess();
          })
          .catch((error) => {
            // Call onFailure if provided
            if (message[1].onFailure) message[1].onFailure(error);
          });
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

function saveProfile(
  msg: {
    username: string;
    profile: User;
  },
  user: Auth.User
) {
  return fetch(`/api/users/${msg.username}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...Auth.headers(user),
    },
    body: JSON.stringify(msg.profile),
  })
    .then((response: Response) => {
      if (response.status === 200) return response.json();
      else throw new Error(`Failed to save profile for ${msg.username}`);
    })
    .then((json: unknown) => {
      if (json) return json as User;
      return undefined;
    });
}
