class KSHamburger extends HTMLElement {
    connectedCallback() {
        this.classList.add(
            "text-xl",
            "px-4",
            "py-1",
            "md:hidden"
        );

        this.style.cursor = "pointer";

        this.innerHTML = "☰";

        this.addEventListener("click1", () => {
            document
                .getElementById("menu")
                ?.classList.toggle("hidden");
        });

        this.addEventListener("click", (event) => {
            event.currentTarget
                .closest("nav")
                ?.querySelector("#menu")
                ?.classList.toggle("hidden");
        });
    }
}

customElements.define("ks-hamburger", KSHamburger);

class KSAnchor extends HTMLElement {
    connectedCallback() {
        const a = document.createElement("a");

        a.id = this.getAttribute("html-id") || "";
        a.href = this.getAttribute("href") || "#";
        a.className = this.getAttribute("class-name") || "";

        const tableName =
            this.getAttribute("table-name");

        if (tableName) {
            a.dataset.tableName = tableName;
        }

        while (this.firstChild) {
            a.appendChild(this.firstChild);
        }

        a.addEventListener("click", event => {

            event.currentTarget
                .closest("nav")
                ?.querySelector("#menu")
                ?.classList.add("hidden");

        });

        this.appendChild(a);
    }
}

customElements.define("ks-anchor", KSAnchor);

export default {};