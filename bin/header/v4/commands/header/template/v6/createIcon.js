import icons from "./icons.js";

export const createIcon = ({
    inSvgName, inSvgDivClass = ""
}) => {
    // console.log("inSvgName : ", inSvgName);

    // if (inSvgName in icons) {
    //     return document
    //         .createRange()
    //         .createContextualFragment(icons[inSvgName])
    //         .firstElementChild;
    // };

    if (inSvgName in icons) {
        const icon = document
            .createRange()
            .createContextualFragment(icons[inSvgName])
            .firstElementChild;

        const div = document.createElement("div");

        // div.className = "size-6 flex items-center justify-center";
        div.className = inSvgDivClass;

        div.appendChild(icon);

        return div;
    };

    return document
        .createRange()
        .createContextualFragment(icons.search)
        .firstElementChild;
};