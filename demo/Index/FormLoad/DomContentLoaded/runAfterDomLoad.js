// import { } from "../../../../../bin/header/v5/commands/header/template/v13/initHeader.js";

import { buildHeader } from "./buildHeader.js";

// import { } from "/dist/v17/index.js";


const runAfterDomLoad = () => {
    import("../../../script.js").then(fromPromise => {
        buildHeader().then(fromPromise => {
        });
    });
};

export { runAfterDomLoad };
