import { css, html, shadow, Events } from "@calpoly/mustang";
import reset from "./styles/reset.css.js";

export class RegistrationForm extends HTMLElement {
  static template = html`<template>
    <form>
      <slot name="title">
        <h3>Sign up to create a Username and Password</h3>
      </slot>
      <label>
        <span>
          <slot name="username">Username</slot>
        </span>
        <input name="username" autocomplete="off" />
      </label>
      <label>
        <span>
          <slot name="password">Password</slot>
        </span>
        <input type="password" name="password" />
      </label>
      <label>
      <slot name="submit">
        <button type="submit">Sign Up</button>
      </slot>
      </label>
    </form>
  </template>`;

  static styles = css`
    form {
      display: grid;
    }

    label {
      display: flex;
      flex-direction: column;
      margin-left: 50px;
      justify-self: center;

      > span {
        grid-column: 1 / 2;
        padding-bottom: 5px;
        
        
      }
      > input {
        grid-column: 1 / 2;
        margin-bottom: 20px;
        width: 300px;
      }
    }

    ::slotted(*[slot="title"]),
    slot[name="title"] > * {
      grid-column: 1/-1;
    }

    ::slotted(button[slot="submit"]),
    button[type="submit"] {
      grid-column: 2 / -2;
      align-self: center;
    }
  `;

  get form() {
    return this.shadowRoot.querySelector("form");
  }

  constructor() {
    super();

    shadow(this)
      .template(RegistrationForm.template)
      .styles(
        reset.styles,
        RegistrationForm.styles
      );

    this.form.addEventListener("submit", (event) =>
      submitRegistrationForm(
        event,
        this.getAttribute("api"),
        this.getAttribute("redirect") || "/"
      )
    );
  }
}

function submitRegistrationForm(event, endpoint, redirect) {
  event.preventDefault();

  const form = event.target.closest("form");
  const data = new FormData(form);
  const method = "POST";
  const headers = {
    "Content-Type": "application/json"
  };
  const body = JSON.stringify(Object.fromEntries(data));

  console.log("POST new user request:", body);

  fetch(endpoint, { method, headers, body })
    .then((res) => {
      if (res.status !== 201)
        throw `Form submission failed: Status ${res.status}`;
      return res.json();
    })
    .then((payload) => {
      const { token } = payload;

      Events.dispatch;
      form.dispatchEvent(
        new CustomEvent("auth:message", {
          bubbles: true,
          composed: true,
          detail: ["auth/signin", { token, redirect }]
        })
      );
    })
    .catch((err) => console.log("Error submitting form:", err));
}