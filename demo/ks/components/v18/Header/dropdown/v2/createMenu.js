export const createMenu = () => {
    const menu = document.createElement("ul");
    menu.className = "hidden absolute right-0 md:left-1/2 md:-translate-x-1/2 mt-2 w-48 rounded-md shadow-2xl bg-gray-800 border border-gray-700 ring-1 ring-black ring-opacity-5 focus:outline-none z-50 p-1 space-y-1 text-left";
    return menu;
};
