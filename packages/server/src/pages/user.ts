import { css, html } from "@calpoly/mustang/server";
import { User } from "models/user";
import renderPage from "./renderPage";

export class UserPage {
    data: User;

    constructor(data: User){
        this.data = data;
        console.log("UserPage received data:", this.data);
    }

    render() {
        return renderPage({
          body: this.renderBody(),
            styles: [
                css``
            ],
            scripts: [
                `import { define , Auth } from "@calpoly/mustang";
                import { userElement } from "/scripts/user.js";

                define({
                "mu-auth": Auth.Provider,
                "user-element": userElement
                });`
            ]
        });
    }

    renderBody() {
        const { favoriteCharacters, username } = this.data;
      
        return html`
          <h1>User Profile: ${username}</h1>
          <mu-auth provides="test:auth">
            <user-element src="/api/users/${username}"></user-element>
          </mu-auth>
        `;
      }      
    
}