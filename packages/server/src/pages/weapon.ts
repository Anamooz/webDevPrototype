import { css, html } from "@calpoly/mustang/server";
import { Weapon } from "../models";
import renderPage from "./renderPage";

export class weaponPage {
    data: Weapon;

    constructor(data: Weapon){
        this.data = data;
    }

    render() {
        return renderPage({
          body: this.renderBody(),
          // add more parts here later
        });
    }

    renderBody() {
        const {
            img,
            stat, 
            statType,
            baseAttack,
            description } = this.data;
            console.log("IMage:", img);
        return html` 
            <section>
            <slot name="weapon">
            <img src="${img}"/>
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