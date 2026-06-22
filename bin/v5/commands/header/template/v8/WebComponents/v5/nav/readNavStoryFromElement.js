import readAttributeOrDefault from "./readAttributeOrDefault.js";

const readNavStoryFromElement = ({ inElement }) => {
    return {
        navClass: readAttributeOrDefault({
            inElement,
            inName: "ks-nav-class",
            inDefaultValue: "bg-gray-800 text-white"
        }),
        outerClass: readAttributeOrDefault({
            inElement,
            inName: "ks-outer-class",
            inDefaultValue: `mx-auto px-3 py-3
    max-w-3xl
    lg:max-w-5xl
    xl:max-w-full xl:px-10`
        }),
        innerClass: readAttributeOrDefault({
            inElement,
            inName: "ks-inner-class",
            inDefaultValue: "flex flex-wrap items-center justify-between"
        }),
        titleId: inElement.getAttribute("ks-title-id"),
        title: inElement.getAttribute("ks-title"),
        brandClass: readAttributeOrDefault({
            inElement,
            inName: "ks-brand-class",
            inDefaultValue: "text-xl font-semibold"
        }),
        menuClass: readAttributeOrDefault({
            inElement,
            inName: "ks-menu-class",
            inDefaultValue: `w-full hidden flex flex-col space-y-2 mt-4
    md:flex md:flex-row md:space-y-0 md:gap-4
    md:mt-0 md:w-auto md:flex-wrap`
        }),
        menuExtraClass: inElement.getAttribute("ks-ul-class"),
        buttonClass: readAttributeOrDefault({
            inElement,
            inName: "ks-button-class",
            inDefaultValue: "text-xl px-4 py-1 md:hidden"
        })
    };
};

export default readNavStoryFromElement;
