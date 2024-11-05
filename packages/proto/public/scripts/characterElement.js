import { css, html, shadow } from "@calpoly/mustang";
import reset from "./styles/reset.css.js";

export class characterElement extends HTMLElement {
  get src() {
    return this.getAttribute("src");
  }

    static template = html`<template>
    <p><slot name="name"></slot></p>   
    </template>`;

    static styles = css`

    p {
      font-family: var(--font-family-body);
      font-size: 26px; 
      color: black;
    }
    
  `;

    constructor() {
        super();
        shadow(this)
            .template(characterElement.template)
            .styles(reset.styles, characterElement.styles);
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

    static renderSlots(json) {
      const entries = Object.entries(json);
      const toSlot = ([key, value]) => {
      
        switch (key) {
          case "name":
            return html`
              <span slot="name">${value}</span>
            `;
        }
      }
    
      return entries.map(toSlot);
      
    
  }
}
