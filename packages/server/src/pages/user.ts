import { css, html } from "@calpoly/mustang/server";
import { User } from "models/user";
import renderPage from "./renderPage";

export class UserPage {
    data: User;

    constructor(data: User){
        this.data = data;
    }

    render() {
        return renderPage({
          body: this.renderBody(),
                stylesheets: ["/styles/destination.css"],
            styles: [
                css``
            ],
            scripts: [
                `import { define } from "@calpoly/mustang";
                import { characterWeaponElement } from "/scripts/characterWeapon.js";

                define({
                "character-weapon": characterWeaponElement
                });`
            ]
        });
    }

    renderBody() {
        const { favoriteCharacters } = this.data;
        return html` 
            <section>
            <p>
                ${favoriteCharacters.map(char => char.name).join(', ')}
            </p>
            </section>
        `;
    }
}