import { css, html } from "@calpoly/mustang/server";
import { Weapon } from "../models";
import renderPage from "./renderPage";

export class WeaponPage {
    data: Weapon;

    constructor(data: Weapon){
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
        const {
            img,
            stat, 
            statType,
            baseAttack,
            description } = this.data;
        return html` 
            <section>
            <slot name="weapon">
            <img src="/images${img}"/>
            </slot>

            <dl>
                <dt>Main Stat</dt>
                <dd><slot name="mainStat">${statType} ${stat}</slot></dd>
                <dt>Base ATK</dt>
                <dd><slot name="baseATK">${baseAttack}</slot></dd>
                <dt>Description</dt>
                <dd><slot name="description">${description}</slot></dd>
            </dl>
            </section>
        `;
    }
}