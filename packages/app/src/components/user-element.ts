import { LitElement, css, html } from "lit";

export class UserElement extends LitElement {

  render() {
    return html`
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
    `;
  }

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
  
}
