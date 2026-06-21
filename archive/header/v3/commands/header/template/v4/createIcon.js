import icons from "./icons.js";

export const createIcon = ({
    inSvgName
}) => {
    console.log("inSvgName : ", inSvgName);

    if (inSvgName in icons) {
        return document
            .createRange()
            .createContextualFragment(icons[inSvgName])
            .firstElementChild;
    };

    return document
        .createRange()
        .createContextualFragment(icons.search)
        .firstElementChild;
};