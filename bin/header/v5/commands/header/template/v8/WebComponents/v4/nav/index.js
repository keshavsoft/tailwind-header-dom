const createNav = ({ inClassName }) => {
    const nav = document.createElement("nav");

    nav.className = inClassName;

    return nav;
};

const createOuterDiv = ({ inClassName }) => {
    const outerDiv = document.createElement("div");

    outerDiv.className = inClassName;

    return outerDiv;
};

const createInnerDiv = ({ inClassName }) => {
    const innerDiv = document.createElement("div");

    innerDiv.className = inClassName;

    return innerDiv;
};

const getAttributeValue = ({ inElement, inName, inDefaultValue }) => {
    const value = inElement.getAttribute(inName);

    if (value === null) return inDefaultValue;

    return value;
};

const createBrand = ({ inTitleId, inTitle, inClassName }) => {
    const brand = document.createElement("div");

    brand.className = inClassName;
    brand.id = inTitleId || "titlehtmlId";
    brand.innerText = inTitle || "KeshavSoft";

    return brand;
};

const createMenu = ({ inClassName, inUlClass }) => {
    const menu = document.createElement("ul");

    menu.id = "menu";
    menu.className = `${inClassName} ${inUlClass || ""}`;

    return menu;
};

const createHamburger = ({ inMenu, inClassName }) => {
    const button = document.createElement("button");

    button.className = inClassName;
    button.innerText = "☰";

    button.addEventListener("click", () => {
        inMenu.classList.toggle("hidden");
    });

    return button;
};

const buildNav = ({ inElement }) => {
    const nav = createNav({
        inClassName: getAttributeValue({
            inElement,
            inName: "ks-nav-class",
            inDefaultValue: "bg-gray-800 text-white"
        })
    });

    const outerDiv = createOuterDiv({
        inClassName: getAttributeValue({
            inElement,
            inName: "ks-outer-class",
            inDefaultValue: `mx-auto px-3 py-3
    max-w-3xl
    lg:max-w-5xl
    xl:max-w-full xl:px-10`
        })
    });

    const innerDiv = createInnerDiv({
        inClassName: getAttributeValue({
            inElement,
            inName: "ks-inner-class",
            inDefaultValue: "flex flex-wrap items-center justify-between"
        })
    });

    const brand = createBrand({
        inTitleId: inElement.getAttribute("ks-title-id"),
        inTitle: inElement.getAttribute("ks-title"),
        inClassName: getAttributeValue({
            inElement,
            inName: "ks-brand-class",
            inDefaultValue: "text-xl font-semibold"
        })
    });

    const menu = createMenu({
        inClassName: getAttributeValue({
            inElement,
            inName: "ks-menu-class",
            inDefaultValue: `w-full hidden flex flex-col space-y-2 mt-4
    md:flex md:flex-row md:space-y-0 md:gap-4
    md:mt-0 md:w-auto md:flex-wrap`
        }),
        inUlClass: inElement.getAttribute("ks-ul-class")
    });

    const button = createHamburger({
        inMenu: menu,
        inClassName: getAttributeValue({
            inElement,
            inName: "ks-button-class",
            inDefaultValue: "text-xl px-4 py-1 md:hidden"
        })
    });

    innerDiv.append(
        brand,
        button,
        menu
    );

    outerDiv.appendChild(innerDiv);
    nav.appendChild(outerDiv);

    return nav;
};

class KSNav extends HTMLElement {
    connectedCallback() {
        if (this.dataset.rendered === "true") return;

        this.dataset.rendered = "true";

        this.appendChild(
            buildNav({
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
