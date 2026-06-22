import composeNavigationStory from "./composeNavigationStory.js";

class KSNav extends HTMLElement {
    connectedCallback() {
        if (this.dataset.rendered === "true") return;

        this.dataset.rendered = "true";

        this.appendChild(
            composeNavigationStory({
                inElement: this
            })
        );
    }
}

customElements.define(
    "ks-nav",
    KSNav
);

export default KSNav;
