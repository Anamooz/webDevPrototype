import { Auth, Observer } from "@calpoly/mustang";
import { html, LitElement } from "lit";
import { state } from "lit/decorators.js";
import { User } from "server/src/models/user.ts";

export class FavoriteViewElement extends LitElement {
  src = "/api/users";

  @state()
  favoriteIndex = new Array<User>();

  render() {
    const favoriteList = this.favoriteIndex.map(this.renderItem);

    return html`
      <main class="page">
        <header>
          <h2>Favorite Characters</h2>
        </header>
        <dl>${favoriteList}</dl>
      </main>
    `;
  }

  renderItem(user: User) {
    const { favoriteCharacters, username } = user;
    return html`
      <dt>${username}</dt>
      <dd>${favoriteCharacters}</dd>
    `;
  }

  async hydrate(url: string) {
    try {
      // Fetch user data from the given URL with authentication headers
      const response = await fetch(url, {
        headers: Auth.headers(this._user),
      });

      // Check for successful response
      if (!response.ok) {
        throw new Error(`Server responded with status ${response.status}`);
      }

      // Parse the response JSON
      const json = await response.json();
      console.log("Response JSON:", json);

      // Validate the response structure and extract `data`
      if (json && typeof json === "object" && "data" in json) {
        const { data } = json as { data: Array<User> };

        // Map the user data into your component's `favoriteIndex`
        this.favoriteIndex = data.map((user) => ({
          ...user,
          favoriteCharacters: user.favoriteCharacters.map((character: any) => ({
            ...character,
            _id: character._id.toString(), // Ensure `ObjectId` is a string
          })),
        }));
      } else {
        console.warn("Unexpected JSON structure:", json);
      }
    } catch (err) {
      console.error("Failed to load user data:", err);
    }
  }

  _authObserver = new Observer<Auth.Model>(this, "test:auth");

  _user = new Auth.User();

  connectedCallback() {
    super.connectedCallback();
    this._authObserver.observe(({ user }) => {
      if (user) {
        this._user = user;
      }
      this.hydrate(this.src);
    });
  }
}
