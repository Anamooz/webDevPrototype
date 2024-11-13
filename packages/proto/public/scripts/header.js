import {
    css,
    html,
    shadow,
    Events,
    Observer
  } from "@calpoly/mustang";
  import reset from "./styles/reset.css.js";
  
  export class HeaderElement extends HTMLElement {
  
    static template = html`<template>
      <header>
        <h1>Best Genshin Character Builds</h1>
        <p>Best weapons, artifacts, and skills and materials you'll need</p>
        <nav>
            <a slot="actuator">
              Hello,
              <span id="userid"></span>
            </a>
            <menu>
              <li class="when-signed-in">
                <a id="signout">Sign Out</a>
              </li>
              <li class="when-signed-out">
                <a href="/login">Sign In</a>
              </li>
            </menu>
        </nav>
      </header>
    </template>`;
  
    static styles = css`
      :host {
        display: contents;
      }
      header {
        display: flex;
        flex-wrap: wrap;
        align-items: bottom;
        justify-content: space-between;
        background-color: var(--color-background-page);
        color: var(--color-text);
      }

      header p {
        font-size: 50px;
      }

      header h1 {
        font-size: 50px;
      }

      nav {
        display: flex;
        flex-direction: column;
        flex-basis: max-content;
        align-items: end;
      }
      a[slot="actuator"] {
        color: var(--color-link-inverted);
        cursor: pointer;
      }
      #userid:empty::before {
        content: "traveler";
      }
      menu a {
        color: var(--color-link);
        cursor: pointer;
        text-decoration: underline;
      }
      a:has(#userid:empty) ~ menu > .when-signed-in,
      a:has(#userid:not(:empty)) ~ menu > .when-signed-out {
        display: none;
      }
    `;
  
    get userid() {
      return this._userid.textContent;
    }
  
    set userid(id) {
      if (id === "anonymous") {
        this._userid.textContent = "";
      } else {
        this._userid.textContent = id;
      }
    }
  
    constructor() {
      super();
      shadow(this)
        .template(HeaderElement.template)
        .styles(
          reset.styles,
          HeaderElement.styles
        );
  
      const dm = this.shadowRoot.querySelector(
        ".dark-mode-switch"
      );
  
      dm.addEventListener("click", (event) =>
        Events.relay(event, "dark-mode", {
          checked: event.target.checked
        })
      );
  
      this._userid = this.shadowRoot.querySelector("#userid");
      this._signout = this.shadowRoot.querySelector("#signout");
  
      this._signout.addEventListener("click", (event) =>
        Events.relay(event, "auth:message", ["auth/signout"])
      );
    }
  
    _authObserver = new Observer(this, "test:auth");
  
    connectedCallback() {
      this._authObserver.observe(({ user }) => {
        if (user && user.username !== this.userid) {
          this.userid = user.username;
        }
      });
    }
  
    static initializeOnce() {
      function toggleDarkMode(page, checked) {
        page.classList.toggle("dark-mode", checked);
      }
  
      document.body.addEventListener("dark-mode", (event) =>
        toggleDarkMode(event.currentTarget, event.detail.checked)
      );
    }
  }