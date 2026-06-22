class KSNav extends HTMLElement {
    connectedCallback() {
        if (this.dataset.rendered === "true") return;

        this.dataset.rendered = "true";

        const nav = document.createElement("nav");
        nav.className = "bg-gray-800 text-white";

        const outerDiv = document.createElement("div");
        outerDiv.className = `mx-auto px-3 py-3
    max-w-3xl
    lg:max-w-5xl
    xl:max-w-full xl:px-10`;

        const innerDiv = document.createElement("div");
        innerDiv.className = "flex flex-wrap items-center justify-between";

        const brand = document.createElement("div");
        brand.className = "text-xl font-semibold";
        brand.id = this.getAttribute("ks-title-id") || "titlehtmlId";
        brand.innerText = this.getAttribute("ks-title") || "KeshavSoft";

        const button = document.createElement("button");
        button.className = "text-xl px-4 py-1 md:hidden";
        button.innerText = "☰";

        const menu = document.createElement("ul");
        menu.id = "menu";
        menu.className = `w-full hidden flex flex-col space-y-2 mt-4
    md:flex md:flex-row md:space-y-0 md:gap-4
    md:mt-0 md:w-auto md:flex-wrap ${this.getAttribute("ks-ul-class") || ""}`;

        button.addEventListener("click", () => {
            menu.classList.toggle("hidden");
        });

        innerDiv.append(
            brand,
            button,
            menu
        );

        outerDiv.appendChild(innerDiv);
        nav.appendChild(outerDiv);
        this.appendChild(nav);
    }
}

customElements.define(
    "ks-nav",
    KSNav
);

export default {};
