export const createLabel = ({
    inTextToShow = "",
    inClassName = ""
}) => {
    const span = document.createElement("span");
    span.className = inClassName;
    span.textContent = inTextToShow;
    return span;
};