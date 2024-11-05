import { css, html, shadow } from "@calpoly/mustang";
import reset from "./styles/reset.css.js";

export class userElement extends HTMLElement {
    static template = html`<template>

    <p>Favorite Characters</p>
    <p>None right now!</p>

    </template>`;

    static styles = css`

    p {
        font-family: var(--font-family-display);
        font-size: 40px;
    }
    
  `;

    constructor() {
        super();
        shadow(this)
            .template(userElement.template)
            .styles(reset.styles, userElement.styles);
    }

    get src() {
        return this.getAttribute("src");
    }

    connectedCallback() {
        if (this.src) this.hydrate(this.src);
    }

    hydrate(url) {
        fetch(url)
          .then((res) => {
            if (res.status !== 200) throw `Status: ${res.status}`;
            return res.json();
          })
          .then((json) => this.renderSlots(json))
          .catch((error) =>
            console.log(`Failed to render data ${url}:`, error)
          );
    }
}