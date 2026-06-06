// /header/v2/buildNav.js

import { buildBrand } from "./buildBrand.js";
import { buildHamburger } from "./buildHamburger.js";
import { buildMenu } from "./buildMenu.js";
import { buildWrapper } from "./buildWrapper.js";

export const buildNav = ({ inTitle = {}, inUiClasses = {} }) => {

    const {
        nav,
        innerDiv
    } = buildWrapper();

    innerDiv.appendChild(
        buildBrand({
            inHeading: inTitle.text,
            inHtmlId: inTitle.htmlId
        })
    );

    innerDiv.appendChild(
        buildHamburger()
    );

    innerDiv.appendChild(
        buildMenu({ inUlClass: inUiClasses?.ulClass })
    );

    return nav;
};