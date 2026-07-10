import headerConfig from "./headers.json" with { type: "json" };

const buildHeader = async () => {
    console.log("headerConfig : ", headerConfig);

    await window.KSHeader(headerConfig);
};

export { buildHeader };