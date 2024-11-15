import { css, html, shadow } from "@calpoly/mustang";
import reset from "./styles/reset.css.js";

export class characterWeaponElement extends HTMLElement {
  static template = html`<template>
    <section>
      <slot name="weapon">
        <img src="/images/weapons/dullBlade.webp" />
      </slot>

      <dl>
        <dt>Main Stat</dt>
        <dd><slot name="mainStat">---------</slot></dd>
        <dt>Base ATK</dt>
        <dd><slot name="baseATK">---------</slot></dd>
        <dt>Description</dt>
        <dd><slot name="description">---------</slot></dd>
      </dl>
    </section>
  </template>`;

  static styles = css`
    section {
      display: grid;
      grid-template-columns: 1fr 1fr;
      font-family: var(--font-family-display);
    }

    img {
      margin: auto;
      background-color: var(--img-background-color);
    }

    dl {
      margin: auto;
      margin-top: 0px;
    }

    dt {
      background-color: #c69b51;
      color: white;
      text-align: center;
    }

    dd {
      text-align: center;
    }
  `;

  constructor() {
    super();
    shadow(this)
      .template(characterWeaponElement.template)
      .styles(reset.styles, characterWeaponElement.styles);
  }
}
