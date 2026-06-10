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
        inClass: inClasses?.aClass,
        inTableName,
        inSvgName,
        inSvgDivClass: inConfigUiClasses.svgDivClass,
        inTextToShow: inTextToShow,
        inClassName: inClasses.spanClass
    });

    li.appendChild(a);

    return li;
};