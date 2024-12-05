import { Auth, define, Observer, Form, View } from "@calpoly/mustang";
import { css, html } from "lit";
import { property, state } from "lit/decorators.js";
import { User } from "server/models";
import reset from "../styles/reset.css";
import { Msg } from "../messages";
import { Model } from "../model";

export class FavoriteViewElement extends View<Model, Msg> {
  static uses = define({
    "mu-form": Form.Element,
  });

  @property({ reflect: true })
  mode = "view";

  @property({ attribute: "username" })
  username = "";

  @state()
  get profile(): User | undefined {
    return this.model.profile;
  }

  @state()
  user?: User;

  constructor() {
    super("test:model");
  }

  get src() {
    const { username } = this._user || {};
    return `/api/users/${username}`;
  }

  switchToEditMode() {
    console.log("Switching to edit mode...");
    this.setAttribute("mode", "edit");
  }

  switchToViewMode() {
    console.log("Switching to view mode...");
    this.setAttribute("mode", "view");
  }

  _handleSubmit(event: Form.SubmitEvent<{ newFavoriteCharacter: string }>) {
    event.preventDefault(); // Prevent default form submission behavior
  
    const characterId = event.detail.newFavoriteCharacter;
  
    if (!characterId) {
      console.error("No character selected.");
      return;
    }
  
    console.log("Adding character ID:", characterId);
  
    this.dispatchMessage([
      "character/add",
      { username: this.username, characterId: characterId },
    ]);
    console.log("username", this.username, "character id", characterId);

    this.switchToViewMode();  
  }
  

  render() {
    const {
      favoriteCharacters = [],
    } = this.profile || {};

    console.log("Rendering view with profile:", this.profile);
    return html`
    <div>
      <section class="view">
        <h1>Favorite Characters</h1>
        <section>
        <dl>
            ${favoriteCharacters.map((character) =>
              this.renderItem(character)
            )}
          </dl>
          <slot name="name"></slot>
        </section>
                <button id="edit"
          @click=${() => (this.mode = "edit")}
        >Edit</button>
      </section>
      <mu-form
        class="edit"
        ?hidden=${this.getAttribute("mode") !== "edit"}
        @mu-form:submit=${this._handleSubmit}
      >
        <label>
          <span>Add a favorite character</span>
          <select name="newFavoriteCharacter"></select>
        </label>
      </mu-form>
    </div>
    `;
  }

  renderItem(character: { name: string;}) {
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
        this.username = user.username;
        console.log("User from view:", user);
        console.log("Username from view:", this.username);
  
        this.dispatchMessage(["profile/select", { username: this.username }]);
        this.populateCharacterDropdown();
      }
    });
  }
  

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    super.attributeChangedCallback(name, oldValue, newValue);
    console.log(`Attribute changed: ${name}, Old: ${oldValue}, New: ${newValue}`);
    if (name === "userid" && oldValue !== newValue && newValue) {
      console.log("Dispatching profile/select with username:", newValue);
      this.dispatchMessage(["profile/select", { username: newValue }]);
    }
  }  
  
}



