import { css, html, shadow } from "@calpoly/mustang";
import reset from "./styles/reset.css.js";

export class characterPageElement extends HTMLElement {
    static template = html`<template>
    <header>
        <slot name="name"><h1>Name</h1></slot>
        <p class="centerText">Support</p>
    </header>









    </template>`;

    static styles = css``;


    constructor() {
        super();
        shadow(this)
            .template(characterPageElement.template)
            .styles(characterPageElement.styles);
    }
}