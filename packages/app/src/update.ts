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
      console.log("Handling profile/select message:", message);
      selectProfile(message[1], user)
        .then((profile) => {
          console.log("Profile successfully fetched:", profile);
          apply((model) => ({ ...model, profile }));
        })
        .catch((error) => {
          console.error("Error in profile/select handling:", error);
        });

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

    case "character/add":
      console.log("Received character/add message:", message);
      addFavoriteCharacter(message[1], user)
        .then((updatedUser) => {
          console.log("Updated user profile:", updatedUser);
          apply((model) => ({ ...model, profile: updatedUser }));
        })
        .catch((error) => {
          console.error("Error adding favorite character:", error);
        });
      break;

    default:
      const unhandled: never = message[0];
      throw new Error(`Unhandled Auth message "${unhandled}"`);
  }
}

function selectProfile(msg: { username: string }, user: Auth.User) {
  console.log("Fetching profile for username:", msg.username);
  return fetch(`/api/users/${msg.username}`, {
    headers: Auth.headers(user),
  })
    .then((response: Response) => {
      console.log("Received response for profile fetch:", response);
      if (response.status === 200) {
        return response.json();
      } else {
        console.error("Failed to fetch profile, status:", response.status);
        return undefined;
      }
    })
    .then((json: unknown) => {
      console.log("Parsed JSON response for profile fetch:", json);
      if (json) {
        return json as User;
      } else {
        console.error("JSON response is undefined or invalid");
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
  console.log("username and charID IN ADDFAVCHARACTER:", msg, user);
  return fetch(
    `/api/users/${msg.username}/favoriteCharacters/${msg.characterId}`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json",
      ...Auth.headers(user),
      }
    }
  )
    .then((response: Response) => {
      if (response.status === 200) {
        console.log("ADDFAVCHAR RESPONSE", response);
        return response.json(); 
        
      }
      throw new Error(
        `Failed to add favorite character: ${response.statusText}`
      );
    })
    .then((json: unknown) => { console.log(json); return (json ? (json as User) : undefined)});
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
