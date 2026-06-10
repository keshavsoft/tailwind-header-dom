import { createIcon } from "../../createIcon.js";

class KSMenuItem extends HTMLElement {
    connectedCallback() {
        const a = document.createElement("a");

        a.id =
            this.getAttribute("html-id") || "";

        a.href =
            this.getAttribute("href") || "#";

        a.className =
            this.getAttribute("class-name") || "";

        const tableName =
            this.getAttribute("table-name");

        if (tableName) {
            a.dataset.tableName =
                tableName;
        };

        const text =
            this.getAttribute("text") || "";

        const svgName =
            this.getAttribute("svg-name") || "";

        const svg = createIcon({
            inSvgName: svgName
        });

        const span =
            document.createElement("span");

        span.textContent = text;

        span.className =
            this.getAttribute(
                "span-class"
            ) || "";

        while (this.firstChild) {
            a.appendChild(
                this.firstChild
            );
        };

        a.append(
            svg,
            span
        );

        a.addEventListener("click", event => {

            console.log("clicked");

            const menu = event.currentTarget
                .closest("nav")
                ?.querySelector("#menu");

            console.log("menu : ", menu);

            menu?.classList.add("hidden");
        });

        a.addEventListener("click1", () => {
            console.log("menu item click");
        });

        this.appendChild(a);
    }
}

customElements.define(
    "ks-menu-item",
    KSMenuItem
);

export default {};



import { createLi } from "../createLi.js";
import { createAnchor } from "../createAnchor.js";
import { createLabel } from "../createLabel.js";
import { createIcon } from "../createIcon.js";
import { orchestrateMenuClick } from "./orchestrateMenuClick.js";

export const buildMenuItem = ({
    inTextToShow,
    inHtmlId,
    inIconPaths,
    inHref,
    onClick,
    inTableName,
    inClasses,
    inSvgName,
    inConfigUiClasses
}) => {
    const li = createLi(inClasses.liClass);

    const a = createAnchor({
        inHtmlId,
        inHref,
        cls: inClasses?.aClass,
        inTableName
    });
    // debugger;
    const span = createLabel({
        inTextToShow: inTextToShow,
        inClassName: inClasses.spanClass
    });

    const svg = createIcon({
        inSvgName,
        inSvgDivClass: inConfigUiClasses.svgDivClass
    });

    if (onClick) {
        a.addEventListener(
            "click",
            orchestrateMenuClick({
                onClick
            })
        );
    };

    a.append(svg, span);

    li.appendChild(a);

    return li;
};