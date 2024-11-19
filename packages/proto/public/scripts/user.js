import {
  css,
  define,
  html,
  shadow,
  Form,
  InputArray,
  Observer,
} from "@calpoly/mustang";
import { characterElement } from "./characterElement.js";
import reset from "./styles/reset.css.js";

export class userElement extends HTMLElement {
  static uses = define({
    "mu-form": Form.Element,
    "input-array": InputArray.Element,
  });

  static template = html`<template>
    <section class="view">
      <h1>Favorite Characters</h1>
      <section>
        <slot name="favoriteCharacters"></slot>
        <slot name="name"></slot>
      </section>
      <button id="edit">Edit</button>
    </section>
    <mu-form class="edit">
      <label>
        <span>Add a favorite character</span>
        <select name="newFavoriteCharacter"></select>
      </label>
    </mu-form>
  </template>`;

  static styles = css`
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
      margin-bottom: 10px; /* Space between dropdown and the button */
    }

    mu-form.edit button {
      margin-top: 10px; /* Space between dropdown and button */
      padding: 10px 20px; /* Add padding inside the button */
      font-size: 16px; /* Adjust font size */
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
      background-color: var(--color-background-page);
      color: var(--color-text);
      font-size: 56px;
      margin-bottom: 50px;
      text-align: center;
    }

    section {
      display: flex;
      flex-direction: column;
      font-family: var(--font-family-body);
      font-size: 36px;
      text-align: center;
    }
  `;

  get src() {
    return this.getAttribute("src");
  }

  get form() {
    return this.shadowRoot.querySelector("mu-form.edit");
  }

  get mode() {
    return this.getAttribute("mode");
  }

  set mode(value) {
    this.setAttribute("mode", value);
  }

  constructor() {
    super();
    shadow(this)
      .template(userElement.template)
      .styles(reset.styles, userElement.styles);

    this.addEventListener("mu-form:submit", (event) =>
      this.submit(this.src, event.detail)
    );

    this.shadowRoot.getElementById("edit").addEventListener("click", () => {
      this.mode = "edit";
    });
  }

  _authObserver = new Observer(this, "test:auth");

  connectedCallback() {
    this._authObserver.observe(({ user }) => {
      console.log("Authenticated user:", user);
      this._user = user;
      if (this.src && this.mode !== "new") this.hydrate(this.src);
    });
    this.populateCharacterDropdown();
  }

  static observedAttributes = ["src"];

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "src" && oldValue !== newValue && newValue)
      this.hydrate(newValue);
  }

  get authorization() {
    console.log("Authorization for user, ", this._user);
    if (this._user && this._user.authenticated)
      return {
        Authorization: `Bearer ${this._user.token}`,
      };
    else return {};
  }

  hydrate(url) {
    fetch(url, { headers: this.authorization })
      .then((res) => {
        if (res.status !== 200) throw `Status: ${res.status}`;
        return res.json();
      })
      .then((json) => {
        console.log("url", url);
        console.log("json", json);
        this.renderSlots(json);
        this.form.init = json;
      })
      .catch((error) => {
        console.log(`Failed to render data ${url}:`, error);
      });
  }

  async populateCharacterDropdown() {
    try {
      const response = await fetch("/api/characters"); // Fetch all characters
      const characters = await response.json();

      const dropdown = this.shadowRoot.querySelector(
        "select[name='newFavoriteCharacter']"
      );
      dropdown.innerHTML = ""; // Clear existing options

      characters.forEach((character) => {
        const option = document.createElement("option");
        option.value = character._id;
        option.textContent = character.name;
        dropdown.appendChild(option);
      });
    } catch (error) {
      console.error("Failed to populate character dropdown:", error);
    }
  }

  renderCharacter(key, json) {
    return html`<character-element slot=${key}>
      ${characterElement.renderSlots(json)}
    </character-element>`;
  }

  renderSlots(json) {
    const entries = [["favoriteCharacters", json.favoriteCharacters]];
    const toSlot = ([key, value]) => {
      console.log("value", value);
      switch (typeof value) {
        case "object":
          if (Array.isArray(value))
            return html` ${value.map((s) => this.renderCharacter(key, s))} `;
        default:
          return html`<span slot="${key}">${value}</span>`;
      }
    };

    const fragment = entries.map(toSlot);
    this.replaceChildren(...fragment);
  }

  submit(url, json) {
    const method = this.mode === "new" ? "POST" : "PUT";

    const dropdown = this.shadowRoot.querySelector(
      "select[name='newFavoriteCharacter']"
    );
    const selectedCharacterId = dropdown.value;

    const putUrl = `${url}/favoriteCharacters/${selectedCharacterId}`;

    fetch(putUrl, {
      method,
      headers: {
        "Content-Type": "application/json",
        ...this.authorization,
      },
    })
      .then((res) => {
        if (res.status !== 200) throw `Status: ${res.status}`;
        return res.json();
      })
      .then((json) => {
        console.log("Updated user data:", json);

        this.renderSlots(json);
        this.form.init = json;

        this.mode = "view"; // Switch back to view mode
      })
      .catch((error) => {
        console.log(`Failed to submit ${putUrl}:`, error);
      });
  }
}
