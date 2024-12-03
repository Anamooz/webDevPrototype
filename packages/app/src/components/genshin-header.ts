import { Auth, Observer, Events } from "@calpoly/mustang";
import { css, html, LitElement } from "lit";
import { state } from "lit/decorators.js";
import { User } from "server/models";
import reset from "../styles/reset.css";

function signOut(ev: MouseEvent) {
  Events.relay(ev, "auth:message", ["auth/signout"]);
  window.location.href = "/login"; // Explicitly navigate to the absolute /login path
}

export class GenshinHeaderElement extends LitElement {
  @state()
  username: string = "traveler";

  @state()
  user?: User;

  render() {
    return html`
      <header>
        <h1>Best Genshin Character Builds</h1>
        <p>Best weapons, artifacts, and skills and materials you'll need</p>
        <nav>
          <a id="userLink" slot="actuator" @click=${this.navigateToUserPage}>
            Hello, <span id="userid" class="username">${this.username}</span>
          </a>
          <menu>
            <li class="when-signed-in">
              <a id="signout" @click=${signOut}>Sign Out</a>
            </li>
            <li class="when-signed-out">
              <a href="/login">Sign In</a>
            </li>
          </menu>
        </nav>
      </header>
    `;
  }

  navigateToUserPage() {
    if (this.username && this.username !== "traveler") {
      const url = `/app/${this.username}`;
      window.location.href = url; // Redirect to the user's page
    } else {
      console.warn("Username is invalid or not set");
    }
  }

  static styles = [
    reset.styles,
    css`
      :host {
        display: contents;
      }

      header {
        justify-content: space-between;
        background-color: var(--color-background-page);
        color: var(--color-text);
        padding-top: 25px;
      }

      header p {
        font-size: 28px;
        margin-left: 40px;
      }

      header h1 {
        font-size: 50px;
        margin-left: 40px;
      }

      nav {
        display: flex;
        flex-direction: column;
        align-items: end;
        margin-right: 20px;
      }

      a[slot="actuator"] {
        color: var(--color-link-inverted);
        cursor: pointer;
        text-decoration: none;
      }

      .username {
        text-decoration: underline;
      }

      #userid:empty::before {
        content: "traveler";
      }

      menu a {
        color: var(--color-link);
        cursor: pointer;
        text-decoration: underline;
      }
      a:has(#userid:empty) ~ menu > .when-signed-in,
      a:has(#userid:not(:empty)) ~ menu > .when-signed-out {
        display: none;
      }
    `,
  ];

  hydrate(url: string) {
    fetch(url, {
      headers: Auth.headers(this._user),
    })
      .then((res) => {
        if (res.status !== 200) throw `Status: ${res.status}`;
        return res.json();
      })
      .then((json) => {
        this.user = json as User;
      })
      .catch((error) => {
        console.log(`Failed to render data ${url}:`, error);
      });
  }

  _authObserver = new Observer<Auth.Model>(this, "test:auth");

  _user = new Auth.User();

  connectedCallback() {
    super.connectedCallback();

    this._authObserver.observe(({ user }) => {
      //console.log("user in genshinheader....", user);
      if (user && user.username) {
        this.username = user.username;
      }
    });
  }

  static initializeOnce() {
    function toggleDarkMode(page: HTMLElement, checked: boolean) {
      page.classList.toggle("dark-mode", checked);
    }

    document.body.addEventListener("dark-mode", (event) =>
      toggleDarkMode(
        event.currentTarget as HTMLElement,
        (event as CustomEvent).detail?.checked
      )
    );
  }
}
