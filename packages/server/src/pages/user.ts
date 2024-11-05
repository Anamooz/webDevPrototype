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
                import { userElement } from "/scripts/user.js";

                define({
                "user-element": userElement
                });`
            ]
        });
    }

    renderBody() {
        const { favoriteCharacters, _id } = this.data;
        console.log(favoriteCharacters[0].toObject());
        return html` 
            <user-element src="/api/users/${_id}">

            </user-element>
        `;
    }
}