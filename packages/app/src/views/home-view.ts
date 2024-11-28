import { css, html, LitElement } from "lit";
import reset from "../styles/reset.css";
import homepage from "../styles/homepage.css";

export class HomeViewElement extends LitElement {
  render() {
    return html`
        <section>
          <h2>Regions</h2>
          <ul>
            <li style="background-image: url(images/regions/mondstadt2.webp);">
              <a href="regions/mondstadt/mondstadt.html">Mondstadt</a>
            </li>
            <li style="background-image: url(images/regions/liyue.jpg);">
              <a href="regions/liyue/liyue.html">Liyue</a>
            </li>
            <li style="background-image: url(images/regions/inazuma.jpg);">
              <a href="regions/inazuma/inazuma.html">Inazuma</a>
            </li>
            <li style="background-image: url(images/regions/sumeru.webp);">
              <a href="regions/sumeru/sumeru.html">Sumeru</a>
            </li>
            <li style="background-image: url(images/regions/fontaine.webp);">
              <a href="regions/fontaine/fontaine.html">Fontaine</a>
            </li>
            <li style="background-image: url(images/regions/natlan.jpg);">
              <a href="regions/natlan/natlan.html">Natlan</a>
            </li>
          </ul>
        </section>
    `;
  }

  static styles = [
    reset.styles, homepage.styles,
    css`
    `,
  ];
}
