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
    inClasses
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
        inClassName: inClasses.svgClass,
        inIconPaths
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