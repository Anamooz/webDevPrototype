import { Auth, define, Observer, Form } from "@calpoly/mustang";
import { css, html, LitElement } from "lit";
import { property, state } from "lit/decorators.js";
import { User } from "server/src/models/user.ts";
import reset from "../styles/reset.css";

export class FavoriteViewElement extends LitElement {
  static uses = define({
    "mu-form": Form.Element,
  });

  @property()
  mode = "view";

  get src() {
    const { username } = this._user || {};
    return `/api/users/${username}`;
  }

  handleSubmit(event: Event) {
    event.preventDefault(); // Prevent any default behavior
    console.log("Submit event triggered!");

    // Extract selected character's ID
    const formData = new FormData(event.target as HTMLFormElement);
    const characterId = formData.get("newFavoriteCharacter");

    if (characterId) {
      console.log("Selected character ID:", characterId);

      // Add to user's favorites
      const character = this.favoriteIndex.find((c) => c._id === characterId);
      if (character) {
        this.favoriteIndex = [...this.favoriteIndex, character];
        console.log("New favorite characters list:", this.favoriteIndex);
      }
    }

    // Switch back to view mode
    this.switchToViewMode();
  }

  switchToEditMode() {
    console.log("Switching to edit mode...");
    this.setAttribute("mode", "edit");
  }

  switchToViewMode() {
    console.log("Switching to view mode...");
    this.setAttribute("mode", "view");
  }

  @state()
  favoriteIndex = new Array<User>();

  @state()
  user?: User;

  render() {
    return html`
    <div>
      <section class="view">
        <h1>Favorite Characters</h1>
        <section>
          <dl>
            ${this.favoriteIndex.map((character) => this.renderItem(character))}
          </dl>
          <slot name="name"></slot>
        </section>
        <button id="edit" @click=${this.switchToEditMode}>Edit</button>
      </section>
      <mu-form
        class="edit"
        ?hidden=${this.getAttribute("mode") !== "edit"}
        @mu-form:submit=${this.handleSubmit}
      >
        >
        <label>
          <span>Add a favorite character</span>
          <select name="newFavoriteCharacter"></select>
        </label>
      </mu-form>
    </div>
    `;
  }

  renderItem(character: { name: string; _id: string }) {
    return html`<dt>${character.name}</dt>`;
  }

  static styles = [
    reset.styles,
    css`
      :host {
        display: contents;
      }

      :host([mode="edit"]) {
        --display-view-none: none;
        --display-editor-none: block;
      }

      :host([mode="view"]) {
        --display-view-none: block;
        --display-editor-none: none;
      }

      section.view {
        display: var(--display-view-none, block);
      }

      mu-form.edit {
        display: var(--display-editor-none, none);
      }

      mu-form.edit select {
        margin-bottom: 10px;
      }

      mu-form.edit button {
        margin-top: 10px;
        padding: 10px 20px; /* Add padding inside the button */
        font-size: 16px;
      }

      label {
        margin-top: 50px;
      }

      button {
        color: white;
        background-color: var(--color-background-page);
        padding: 5px;
      }

      h1 {
        font-family: var(--font-family-display);
        color: var(--color-background-page);
        font-size: 40px;
        margin-bottom: 50px;
        margin-top: 30px;
        text-align: center;
      }

      section {
        display: flex;
        flex-direction: column;
        font-family: var(--font-family-body);
        font-size: 36px;
        text-align: center;
      }
    `,
  ];

  hydrate(url: string) {
    fetch(url, {
      headers: Auth.headers(this._user),
    })
      .then((res) => {
        if (res.status !== 200) throw new Error(`Status: ${res.status}`);
        return res.json();
      })
      .then((json: User) => {
        // Set the user and favoriteIndex state
        this.user = json;
        this.favoriteIndex = json.favoriteCharacters || []; // Populate favoriteIndex
        console.log("Fetched user data:", json);
      })
      .catch((error) => {
        console.error(`Failed to fetch data from ${url}:`, error);
      });
  }

  populateCharacterDropdown() {
    fetch("/api/characters", {
      headers: Auth.headers(this._user),
    })
      .then((res) => {
        if (!res.ok)
          throw new Error(`Failed to fetch characters: ${res.status}`);
        return res.json();
      })
      .then((characters: { _id: string; name: string }[]) => {
        const dropdown = this.shadowRoot?.querySelector(
          "select[name='newFavoriteCharacter']"
        );
        if (dropdown) {
          dropdown.innerHTML = ""; // Clear existing options
          characters.forEach((character) => {
            const option = document.createElement("option");
            option.value = character._id;
            option.textContent = character.name;
            dropdown.appendChild(option);
          });
        }
        console.log("Dropdown populated with characters:", characters);
      })
      .catch((error) => {
        console.error("Failed to populate dropdown:", error);
      });
  }

  _authObserver = new Observer<Auth.Model>(this, "test:auth");

  _user = new Auth.User();

  connectedCallback() {
    super.connectedCallback();
    this._authObserver.observe(({ user }) => {
      if (user) {
        this._user = user;
        console.log("User from view:", user);
        this.hydrate(this.src);
        this.populateCharacterDropdown();
      }
    });
  }
}
