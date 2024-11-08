import { css, html, shadow } from "@calpoly/mustang";
import { characterElement } from "./characterElement.js";
import reset from "./styles/reset.css.js";

export class userElement extends HTMLElement {
  get src() {
    return this.getAttribute("src");
  }

    static template = html`<template>
    
    <h1>Favorite Characters</h1>
    <ul>
      <li>
      <slot name="favoriteCharacters"></slot>
      </li>
      <slot name="name"></slot>  
    </ul>
    </template>`;

    static styles = css`

    h1 {
        font-family: var(--font-family-display);
        font-size: 40px;
        padding-left: 20px;
        margin-top: 20px;
        margin-bottom: 20px;
    }

    li {
      font-family: var(--font-family-body);
      font-size: 22px; 
      margin-left: 20px;
    }
    
  `;

    constructor() {
        super();
        shadow(this)
            .template(userElement.template)
            .styles(reset.styles, userElement.styles);
    }

    connectedCallback() {
        if (this.src) this.hydrate(this.src);
    }

    static observedAttributes = ["src"];

    attributeChangedCallback(name, oldValue, newValue) {
      if (name === "src" && oldValue !== newValue && newValue)
        this.hydrate(newValue);
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

    renderCharacter(key, json) {
        return html`<character-element slot=${key}>
        ${characterElement.renderSlots(json)}
      </character-element>`
    }

    renderSlots(json) {
      const entries = Object.entries(json);
      const toSlot = ([key, value]) => {
      
        switch (typeof value) {
          case "object":
            if (Array.isArray(value))
              return html`
                ${value.map((s) => this.renderCharacter(key, s))}
              `;
          default:
            return html`<span slot="${key}">${value}</span>`;
        }
      }
    
      const fragment = entries.map(toSlot);
      this.replaceChildren(...fragment);
    
  }
}